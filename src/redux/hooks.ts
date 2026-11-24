import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from ".";

export const useTypedSelector: TypedUseSelectorHook<Rootstate> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
