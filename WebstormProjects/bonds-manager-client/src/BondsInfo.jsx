import React from 'react';
import Bond from "./Bond";

const BondsInfo = ({bondsData}) => {
    return (
        <>{bondsData.length > 0 ? (
            bondsData.map((item, index) => <Bond key={index} bond={item}/>)
        ) : (
            <p>Нет доступных данных для отображения</p>
        )}
            <p>
                <br/>Надеюсь, было полезно! Буду рад подписке в пульсе🧡, у меня много интересного. Всем удачи на рынке🤑
            </p>
            <p>
                <br/>#пульс #пульс_оцени #прояви_себя_в_пульсе #облигации #новичкам #хочу_в_дайджест
            </p>

        </>
    )
}
export default BondsInfo