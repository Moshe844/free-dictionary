const MeaningsList = ({ mean }) => {
  console.log(mean);
  return (
    <div>
      {mean.map((val) =>
        val.meanings.map((means) =>
          means.definitions.map((def) => {
            return (
              <div key={def.definition}>
                <li>{def.definition}</li>
                <hr />
              </div>
            );
          })
        )
      )}
    </div>
  );
};

export default MeaningsList;
