import {useState} from "react";
import {Button, Flex, FormControl, FormLabel, Input} from "@chakra-ui/react";

const MonthReport = () => {

    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [response, setResponse] = useState(null);
    const handleSubmit = () => {
        const response = fetch(`http://194.87.199.155:8000/report/${month}/${year}`)
            .then((res) => res.json()
                .then((res) => {
                    setResponse(res);
        }));
    }
    const numbers = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"];
    const bonds = response ? response.purchases.filter(pc => pc.type === "bond") : null;
    const shares = response ? response.purchases.filter(pc => pc.type === "share") : null;
    const sbonds = response ? response.sellers.filter(pc => pc.type === "bond") : null;
    const sshares = response ? response.sellers.filter(pc => pc.type === "share") : null;
    const leaders = response ? response.bonds_coupon.slice(0, 5) : null;
    const bbs = response ? response.buyAndSell.filter(pc => pc.type === "bond") : null;
    const sbs = response ? response.buyAndSell.filter(pc => pc.type === "share") : null;
    return (
        <>
            <Flex direction="row" justify="space-between">
                <FormControl>
                    <FormLabel>Месяц</FormLabel>
                    <Input type={"number"} border={"2px solid blue"} onChange={e => setMonth(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Год</FormLabel>
                    <Input type={"number"} border={"2px solid green"} onChange={e => setYear(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Год</FormLabel>
                    <Button colorScheme={"blue"} onClick={handleSubmit}>
                        Отправить
                    </Button>
                </FormControl>
            </Flex>
            { response ? <div>
                Приветствую, состряпал для себя мини-отчет по портфелю. В дальнейшем планирую его расширить. Итак, что по марту 🤔
                <p><br/>Пришло купонами: {response.coupon_sum.toFixed(2)} руб. 🤫 </p>
                <p>Пополнил на: {response.input1.toFixed(2)} руб. 😲</p>
                🟢 Покупки<br/>
                {bonds.length > 0 ? <p><br/>📌 Облигации:
                        {bonds.map(bond => {
                            return (
                                <p>
                                    🔻 ${bond.ticker} {bond.name} +{bond.count} шт.
                                </p>
                            )
                        })}
                    </p>: null }
                    {
                        shares.length > 0 ? <p>
                            <br/>📌 Акции:
                            {shares.map(bond => {
                                return (
                                    <p>
                                        🔻 ${bond.ticker} {bond.name} +{bond.count} шт.
                                    </p>
                                )
                            })}
                        </p> : null
                    }
                <br/>🟢 Продажи <br/>
                {sbonds.length > 0 ? <p><br/>📌 Облигации:
                {sbonds.map(bond => {
                    return (
                    <p>
                        🔻 ${bond.ticker} {bond.name} -{bond.count} шт.
            </p>
                                )
                            })}
                        </p>:null}
                {sshares.length > 0 ? <p>
                        <br/>📌 Акции:<br/>
                        {sshares.map(bond => {
                            return (
                                <p>
                                    🔻 ${bond.ticker} {bond.name} -{bond.count} шт.
                                </p>
                            )
                        })}
                    </p> : null}
                { bbs.length + sbs.length > 0 ? <div>
                    <br/>🟢 Купля-продажа в пределах этого месяца<br/>
                    {bbs.length > 0 ? <p>
                        <br/>📌 Облигации:<br/>
                        {bbs.map(bond => {
                            return (
                                <p>
                                    🔻 ${bond.ticker} {bond.name} {bond.count} шт.
                                </p>
                            )
                        })}
                    </p>: null}
                    {sbs.length > 0 ? <p>
                        <br/>📌 Акции:<br/>
                        {sbs.map(bond => {
                            return (
                                <p>
                                    🔻 ${bond.ticker} {bond.name} {bond.count} шт.
                                </p>
                            )
                        })}
                    </p>: null}
                </div>: null }

                <p>
                    <br/>🟢 Комиссионные расходы: {response.fee.toFixed(2)} руб.<br/>
                </p>
                <p>
                    <br/> 💥 Топ моих бумаг по купонам: <br/>
                    {leaders.map((bond, index) => {
                        return (
                            <p>
                                {numbers[index]} ${bond.ticker} {bond.name} +{bond.count} руб.
                            </p>
                        )
                    })
                    }
                </p>
                На этом пока все, буду рад любой вашей поддержке. Всем удачи и терпения на летящем вниз рынке🍀

            </div> : null}
        </>
    )
}
export default MonthReport;