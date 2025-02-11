import React, { useState, useContext } from "react";
import { useUserContext } from "./UserContext";
import { routes } from "@/constants/Survey";

export const SurveyContext = React.createContext();

export function useSurveyContext() {
  const surveyState = useContext(SurveyContext);

  if (surveyState === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return surveyState;
}

export function SurveyProvider({children}) {

  const finish = () => {
    //const userState = useUserContext();
  }

  const [route, setRoute] = useState(routes[0]);
  const [experience, setExperience] = useState('');
  const [days, setDays] = useState({});
  const [bias, setBias] = useState({});
  const [base, setBase] = useState([]);
  const [split, setSplit] = useState([]);
  const [style, setStyle] = useState(-1.0);
  const [sets, setSets] = useState(-1);
  const [time, setTime] = useState(-1.0);
  const [accessories, setAccessories] = useState({});
  const [regions, setRegions] = useState({
    chest: -1.0, 
    back: -1.0, 
    legs: -1.0
  });
  const [movements, setMovements] = useState({
    "horiz-press": null, 
    "vert-press": null, 
    "horiz-pull": null, 
    "vert-pull": null,  
    "knee-flex": null, 
    "hip-ext": null, 
    "curl": null, 
    "ext": null, 
  });

  const surveyState = {
    route: route,
    setRoute: setRoute,
    setExperience: setExperience,
    setDays: setDays,
    setBias: setBias,
    setBase: setBase,
    setSplit: setSplit,
    setStyle: setStyle,
    setSets: setSets,
    setTime: setTime,
    setAccessories: setAccessories,
    setRegions: setRegions,
    setMovements: setMovements, 
    finish: finish
  }

  return (
    <SurveyContext.Provider value={surveyState}>
      {children}
    </SurveyContext.Provider>
  )
} 