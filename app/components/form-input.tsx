'use client'
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';

export default function SearchInput() {
  // The list of options
  const arrayOfOptions = [
    "rek1",
    "rek2",
    "rek3"
  ];

  // State for the input value
  const [value, setValue] = useState<string>('');

  // State for suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Function to get suggestions based on user input
  const getSuggestions = (inputValue: string) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return arrayOfOptions.filter(option =>
      option.toLowerCase().includes(inputValueLowerCase)
    );
  };

  // Function to render suggestions
  const renderSuggestion = (suggestion: string) => (
    <div>
      {suggestion}
    </div>
  );

  // Autosuggest input props
  const inputProps = {
    placeholder: 'Search...',
    value,
    id: 'query',
    name: 'query',
    onChange: (_event: any, { newValue }: any) => setValue(newValue)
  };

  // Autosuggest onSuggestionsFetchRequested
  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(getSuggestions(value));
    const inputField = document.getElementById('query')
    if(inputField){
      inputField.classList.add('rounded-t-3xl');
      inputField.classList.remove('rounded-3xl');
    }
    if(inputField && getSuggestions(value).length == 0){
      inputField.classList.add('rounded-3xl');
      inputField.classList.remove('rounded-t-3xl');
    }
  };

  // Autosuggest onSuggestionsClearRequested
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
    const inputField = document.getElementById('query')
    if(inputField){
      //inputField.style.borderBottomLeftRadius = '9999';
      //inputField.style.borderBottomRightRadius = '9999';
      inputField.classList.add('rounded-3xl');
      inputField.classList.remove('rounded-t-3xl');
    }
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion:string) => suggestion}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        container: 'relative w-96',
        suggestionsContainer: 'absolute bg-[#303134] text-on-surface w-full rounded-b-3xl overflow-hidden',
        suggestionsList: 'overflow-auto max-h-40 pb-2',
        suggestion: 'p-2 cursor-pointer text-on-surface overflow-hidden',
        suggestionHighlighted: 'bg-[#3C4043] overflow-hidden',
        input: 'bg-[#202124] border border-[#5f6368] focus:border-0 focus:bg-[#303134] focus:shadow-outer2 w-full h-full appearance-none rounded-3xl outline-none py-2 px-4 leading-tight text-on-surface'
      }}
    />
  );
}