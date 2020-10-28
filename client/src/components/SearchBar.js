import React from 'react';
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 8px;
  form {
    display: flex;
    margin-top: 0em;
    text-align: left;
    background-color: #FFFFFF;
    width: 500px;
    border: #DCD6CC 1px solid;
  }
  .icon {
    box-sizing: border-box;
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 2;
    vertical-align: text-bottom;
    margin-right: 4px;
    color: #636466;
    cursor: pointer;
    text-align: left;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    box-shadow: none;
    background-color: transparent;
    padding: 4px 26px 4px 8px;
    min-height: 26px;
    outline: none;
    border: none;
    overflow: hidden;
    line-height: 1.4;
    font-size: 13px;
    color: #333333;
    margin: 0px;
    text-indent: 0px;
    display: inline-block;
    text-align: start;
    font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  }
  form:focus {
    box-shadow: 0 0 4px rgba(185,173,153,0.5);
    border-color: #B9AD99;
    outline: 0px;
  }
`;

const SearchBar = () => {
  return (
    <SearchBarWrapper>
      <form>
        <input
          type="text"
          name="search"
          placeholder="Search Restaurants Nearby"
        />
        <span className="icon">
          <svg width="16px" height="16px" viewBox="0 0 24 24"><g id="search" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5,18 C6.35786438,18 3,14.6421356 3,10.5 C3,6.35786438 6.35786438,3 10.5,3 C14.6421356,3 18,6.35786438 18,10.5 C18,14.6421356 14.6421356,18 10.5,18 Z M20.9497475,20.9497475 L16,16 L20.9497475,20.9497475 Z"></path></g></svg>
        </span>
      </form>
    </SearchBarWrapper>
  );
};

export default SearchBar;
