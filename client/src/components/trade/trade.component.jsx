import './trade.styles.scss';

const Trade = ({ trade }) => {
  return (
    <div className='trade'>
      {Object.keys(trade).map((key) => (
        <p key={key}>
          <strong>{key}</strong>
          {` : ${trade[key]}`}
        </p>
      ))}
    </div>
  );
};

export default Trade;
