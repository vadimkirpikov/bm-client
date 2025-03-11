import React from 'react';
import BondsInfo from "./BondsInfo";
import {Box, Button} from "@chakra-ui/react";
import CriteriaDescription from "./CriterialDescription";
import ClipboardJS from "clipboard";


export const PartialBondsInfo = ({formData, bondsData, partSize}) => {
    const partialMas = []
    console.log(bondsData);
    for (let i = 0; i < bondsData.length; i+=partSize) {
        let mas = bondsData.slice(i, Math.min(i+partSize, bondsData.length));
        partialMas.push([...mas]);
    }
    const copyToClipboard = () => {
        var clipboard = new ClipboardJS('.copy-btn');

        clipboard.on('success', function(e) {
            console.log('Текст успешно скопирован!');
        });

        clipboard.on('error', function(e) {
            console.error('Ошибка при копировании текста:', e);
        });
    };
    let mas = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]
    return (
        <>
            {partialMas.map((item, key) =>
                <Box p={4} mt={4} border="1px solid #ccc" borderRadius="md" id={"final"+key}>
                <p>😉 Приветствую, выкладываю подборку облигаций.<br /></p>
                <CriteriaDescription formData={formData} />
                    <p>
                        <br />Часть {mas[key]} <br/>
                    </p>
                <p>
                    <br/>Итак, начинаем 🍻 <br/>
                </p>
                <BondsInfo bondsData={item} />
                {/* Кнопка "Копировать" */}
                <Button className={"copy-btn"} data-clipboard-target={`#${"final"+key}`} colorScheme="teal" onClick={copyToClipboard}>
                    Копировать
                </Button>
            </Box> ) }
        </>
    );
}