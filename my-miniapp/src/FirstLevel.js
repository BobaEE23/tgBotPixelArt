const FirstLevel = ({ level }) => {
    if (!level) {
      return <div>Выберите уровень</div>;
    }
  
    return (
      <div>
        <h1>Уровень: {level.name}</h1>
        <p>{level.description}</p> {/* Предположим, что у уровня есть описание */}
        {/* Здесь логика для отображения первого уровня */}
      </div>
    );
  };
  
  export default FirstLevel;
  