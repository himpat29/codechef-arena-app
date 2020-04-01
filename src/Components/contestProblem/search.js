import React, { useState, useEffect, useContext } from 'react'
import Autosuggest from 'react-autosuggest';
import AuthContext from '../../Context/auth/authContext';
import CodechefContext from '../../Context/codechef/codechefContext';
import Spinner from '../layout/spinner.js';
import Alert from '../layout/alert';
import AlertContext from '../../Context/alert/alertContext'
const Search = () => {
  const authContext = useContext(AuthContext);
  const codechefContext = useContext(CodechefContext);
  const alertContext=useContext(AlertContext);
  
  useEffect(() => {
    authContext.loadPage();
    codechefContext.getContestList();
     //eslint-disable-next-line
  },[])
  const contests=codechefContext.contestList;
  
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionValue,setSuggestionValue]=useState('');

  const getSuggestionValue = (suggestion) => {
    setSuggestionValue(suggestion.name +' ('+suggestion.code+')');
    return suggestion.name +' ('+suggestion.code+')';
  }

  const renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion.name+' ('+suggestion.code+')'}</span>
    );

  }

  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };

  const getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return contests.filter(contest => regex.test(contest.name)||regex.test(contest.code));
  }
  const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    var fetchedSuggestions=getSuggestions(value);
    if(fetchedSuggestions.length>5){
     fetchedSuggestions=fetchedSuggestions.slice(0,6);
    }
    setSuggestions(fetchedSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const inputProps = {
    placeholder: "Type Contest Name or Contest Code",
    value,
    onChange: onChange
  };
  const onSubmit=async(e)=>{
    e.preventDefault();
    var regExp=/\(([^]+)\)/;
    if(suggestionValue!==''){
    var match=regExp.exec(suggestionValue);
    codechefContext.getContestDetail(match[1]);
    }else{
      alertContext.setAlert('Please select a valid choice','danger');
    }
    
  }
  if(codechefContext.loading){
    return <Spinner/>
  }
  return (
    <div className='Search'>
     <Alert/>
    <form onSubmit={onSubmit}>  
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps} />
      <input type='submit' value='search' size="50px" />
      </form>  
      </div>
  );
}

export default Search;
