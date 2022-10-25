const Synonym = ({ mean }) => {
  const synonyms = [];
  mean.forEach((val) => {
    const synonymObjects = val.meanings.filter(
      (meaning) => meaning.synonyms.length !== 0
    );

    synonymObjects.forEach((synonymObject) =>
      synonyms.push(...synonymObject.synonyms)
    );
  });

  return (
    <div className="columns-2 md:columns-3">
      {synonyms.map((syn) => (
        <li>{syn}</li>
      ))}
    </div>
  );
};

export default Synonym;
