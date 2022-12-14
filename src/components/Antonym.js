const Antonym = ({ mean }) => {
  const antonyms = [];
  mean.forEach((val) => {
    const antonymObjects = val.meanings.filter(
      (meaning) => meaning.antonyms.length !== 0
    );

    antonymObjects.forEach((antonymObject) =>
      antonyms.push(...antonymObject.antonyms)
    );
  });

  return (
    <div className="columns-2 md:columns-3">
      {antonyms.map((ant) => (
        <li key={ant.antonyms}>{ant}</li>
      ))}
    </div>
  );
};

export default Antonym;
