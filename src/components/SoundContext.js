/* eslint-disable prettier/prettier */
import React, {createContext, useContext, useState} from 'react';

const SoundContext = createContext();

export const useSoundContext = () => {
  return useContext(SoundContext);
};

export const SoundProvider = ({children}) => {
  const [musicvolume, setMusicVolume] = useState(1);
  const [soundvolume, setSoundVolume] = useState(1);
  const updateMusicVolume = newVolume => {
    setMusicVolume(newVolume);
  };
  const updateSoundVolume = newVolume => {
    setSoundVolume(newVolume);
  };

  return (
    <SoundContext.Provider value={{musicvolume, updateMusicVolume,soundvolume,updateSoundVolume}}>
      {children}
    </SoundContext.Provider>
  );
};
