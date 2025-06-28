import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  HStack,
} from "@chakra-ui/react";
import CriteriaDescription from "./CriterialDescription";
import ClipboardJS from "clipboard";
import BondsInfo from "./BondsInfo";
import {PartialBondsInfo} from "./DistributedBondData";

const BondsForm = () => {
  const [formData, setFormData] = useState({
    currency: "rub",
    nominalCurrency: "rub",
    priceFrom: 0,
    priceTo: 1100,
    nominal: 1000,
    ratingFrom: null,
    ratingTo: null,
    couponPrcFrom: 20,
    couponPrcTo: null,
    maturityDateFrom: null,
    maturityDateTo: null,
    withoutAnyEvent: false,
    bondType: null,
    availability: 0,
    placementDateFrom: null,
    placementDateTo: null,
    couponQuantityPerYear: 12,
    sector: null,
    aciValueFrom: null,
    aciValueTo: null,
    amortizationFlag: null,
    isFloater: 0,
    marginAble: 0
  });

  const [responseText, setResponseText] = useState("[]");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : isNaN(value) || value === "" ? value : Number(value),
    }));
  };

  const [bondsData, setBondsData] = useState([])

  const handleRadioChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: Number(value),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Фильтруем форму, удаляя пустые или null значения
    const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => {
          // Убираем поля, если их значение пустое или null
          return value !== null && value !== "" && (typeof value !== "number" || !isNaN(value));
        })
    );

    try {
      console.log(filteredData);
      const response = await fetch("http://194.87.199.155:8000/getFilteredBonds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredData),
      });
      const data = await response.json();
      setBondsData(data);
    } catch (error) {
      setResponseText("Ошибка запроса");
    }
  };


  return (
      <Box p={4} maxW="3xl" mx="auto">
        <form onSubmit={handleSubmit}>
          <HStack spacing={6} align="flex-start" direction={{ base: "column", md: "row" }}>
            {/* Форма слева */}
            <Box flex="1" display="flex" flexDirection="column" gap={4}>
              {Object.keys(formData).map((key, index) => {
                if (key === "availability" || key === "isFloater" || key === "amortizationFlag" || "marginAble") {
                  return (
                      <FormControl key={index}>
                        <FormLabel fontSize="sm" fontWeight="semibold">
                          {key}
                        </FormLabel>
                        <RadioGroup onChange={(e) => handleRadioChange(e, key)} value={formData[key]}>
                          <Stack direction="row">
                            <Radio value={0}>похуй</Radio>
                            <Radio value={1}>нет</Radio>
                            <Radio value={2}>да</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                  );
                }

                if (key === "withoutAnyEvent") {
                  return (
                      <FormControl key={key}>
                        <FormLabel fontSize="sm" fontWeight="semibold">
                          {key}
                        </FormLabel>
                        <Checkbox name={key} isChecked={formData[key]} onChange={handleChange} />
                      </FormControl>
                  );
                }

                if (key.includes("Date")) {
                  return (
                      <FormControl key={key}>
                        <FormLabel fontSize="sm" fontWeight="semibold">
                          {key}
                        </FormLabel>
                        <Input
                            type="datetime-local"
                            name={key}
                            value={formData[key] || ""}
                            onChange={handleChange}
                        />
                      </FormControl>
                  );
                }

                return (
                    <FormControl key={key}>
                      <FormLabel fontSize="sm" fontWeight="semibold">
                        {key}
                      </FormLabel>
                      <Input
                          type={["currency", "ratingFrom", "ratingTo", "bondType", "nominalCurrency"].includes(key) ? "text" : "number"}
                          name={key}
                          value={formData[key] || null}
                          onChange={handleChange}
                          borderRadius="md"
                          padding="2"
                      />
                    </FormControl>
                );
              })}
              <Button type="submit" colorScheme="blue" p={2} borderRadius="md">
                Отправить
              </Button>
            </Box>
          </HStack>
        </form>
        <PartialBondsInfo bondsData={bondsData} formData={formData} partSize={13} />
      </Box>
  );
};

export default BondsForm;
