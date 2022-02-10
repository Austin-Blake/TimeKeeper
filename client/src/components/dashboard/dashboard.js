import React, { useState } from 'react';
import { Button } from '../util_components/Button';
import { A,navigate} from 'hookrouter';

export const Dashboard = () => {

  let id = sessionStorage.getItem("sys_id");
  return (
    <>
      <A href={`/profile/${id}`}>
      <Button text="Profile"/>
      </A>
      
  </>);
};
