'use client';
import React, { useState, useEffect, use } from 'react';
import Autosuggest from 'react-autosuggest';
import Fuse from 'fuse.js';

export default function SearchInput(props: { searchList: any }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const inputField = document.getElementById('query');
    if (inputField) {
      inputField.classList.add('rounded-t-3xl');
      inputField.classList.remove('rounded-3xl');
    }
    if (inputField && suggestions.length === 0) {
      //console.log(inputField.classList);
      inputField.classList.add('rounded-3xl');
      inputField.classList.remove('rounded-t-3xl');
    }
  }, [suggestions]);

  const getSuggestions = (inputValue: string) => {
    const fuseOptions = {
      keys: ['name', 'genres'],
    };
    const searchPattern = inputValue.toLowerCase();
    const fuse = new Fuse(props.searchList, fuseOptions);
    const results = fuse.search(searchPattern);
    const foundSuggestions = results.map((match) => {
      return match.item.name;
    });
    setSuggestions(foundSuggestions);
    console.log(foundSuggestions, suggestions.length);
  };

  // Function to render suggestions
  const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;

  // Autosuggest input props
  const inputProps = {
    placeholder: 'Search...',
    value,
    id: 'query',
    name: 'query',
    onChange: (_event: any, { newValue }: any) => setValue(newValue),
  };

  // Autosuggest onSuggestionsFetchRequested
  const onSuggestionsFetchRequested = ({ value }: any) => {
    getSuggestions(value);
  };

  // Autosuggest onSuggestionsClearRequested
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
    //setResults([]);
    const inputField = document.getElementById('query');
    if (inputField) {
      inputField.classList.add('rounded-3xl');
      inputField.classList.remove('rounded-t-3xl');
    }
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion: string) => suggestion}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        container: 'relative w-96 z-50',
        suggestionsContainer:
          'absolute bg-[#303134] text-on-surface w-full rounded-b-3xl overflow-hidden',
        suggestionsList: 'overflow-auto pb-2',
        suggestion: 'p-2 cursor-pointer text-on-surface overflow-hidden',
        suggestionHighlighted: 'bg-[#3C4043] overflow-hidden',
        input:
          'bg-[#202124] border border-[#5f6368] focus:border-0 focus:bg-[#303134] focus:shadow-outer2 w-full h-full appearance-none rounded-3xl outline-none py-2 px-4 leading-tight text-on-surface',
      }}
    />
  );
}
