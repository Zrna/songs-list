import './styles.scss';

const Search = ({ placeholder, value, onChange }) => {
  return (
    <input
      className='search'
      placeholder={placeholder}
      name='searchByArtist'
      value={value}
      onChange={onChange}
    />
  );
};

export default Search;
