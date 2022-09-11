import { useReducer } from "react";

enum StepActions {
  Increment = "increment",
  Decrement = "decrement",
}
interface IStep {
  step: number;
}
interface IAction {
  type: StepActions;
}

export default function useStep() {
  const initialState: IStep = { step: 0 };
  const [stepData, stepDispatch] = useReducer(reducer, initialState);

  const handleIncrement = () => stepDispatch({ type: StepActions.Increment });
  const handleDecrement = () => stepDispatch({ type: StepActions.Decrement });

  function reducer(state: IStep, action: IAction) {
    switch (action?.type) {
      case StepActions.Increment: {
        return { step: state.step + 1 };
      }
      case StepActions.Decrement: {
        return { step: state.step - 1 };
      }
    }
  }
  return { stepData, handleIncrement, handleDecrement };
}
