import React, { useState, useCallback, useEffect, useRef } from "react";
import ClipboardJS from "clipboard";

const UploadAndRenderReport = () => {
    const [reportText, setReportText] = useState("");
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const copyBtnRef = useRef(null);

    const processText = (text) => text.replace(/\*/g, "");

    const handleUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        try {
            const response = await fetch("http://194.87.199.155:8000/upload-pdf", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setReportText(processText(data.make_response));
        } catch (err) {
            console.error("Ошибка при загрузке файла:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => handleUpload(e.target.files[0]);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    useEffect(() => {
        if (copyBtnRef.current) {
            const clipboard = new ClipboardJS(copyBtnRef.current);
            clipboard.on("success", () => {
                copyBtnRef.current.textContent = "Скопировано!";
                setTimeout(() => {
                    if (copyBtnRef.current) copyBtnRef.current.textContent = "Копировать";
                }, 1500);
            });
            clipboard.on("error", () => {
                alert("Ошибка копирования");
            });

            return () => clipboard.destroy();
        }
    }, [reportText]);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Загрузка PDF и рендер отчёта</h1>

            <div
                className={`border-2 border-dashed rounded-lg p-6 mb-6 transition-colors ${
                    dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleChange}
                    className="hidden"
                    id="fileUpload"
                />
                <label htmlFor="fileUpload" className="cursor-pointer block text-center">
                    <p className="text-lg text-gray-700">
                        Перетащите PDF-файл сюда или <span className="text-blue-600 underline">выберите файл</span>
                    </p>
                </label>
            </div>

            {loading && (
                <p className="text-blue-500 mb-4">Загрузка и обработка файла...</p>
            )}

            {!loading && reportText && (
                <div className="space-y-4">
                    <button
                        ref={copyBtnRef}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        data-clipboard-text={reportText}
                    >
                        Копировать
                    </button>
                    <div
                        className="prose whitespace-pre-wrap bg-white p-4 rounded shadow"
                        dangerouslySetInnerHTML={{
                            __html: reportText.replace(/\n/g, "<br/>"),
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default UploadAndRenderReport;
