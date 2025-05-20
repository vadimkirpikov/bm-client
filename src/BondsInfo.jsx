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
                <br/>Надеюсь, было полезно! Всем удачи на рынке🚀
                <br/> 🔔Подписывайтесь❤️
            </p>
            <p>
                <br/>#пульс #пульс_оцени #прояви_себя_в_пульсе #облигации #новичкам #хочу_в_дайджест #новичок
            </p>

        </>
    )
}
export default BondsInfo