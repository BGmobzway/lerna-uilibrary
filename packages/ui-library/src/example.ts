import createComponent from "./index";
import { h } from '../../../node_modules/snabbdom/build/h';
type State = {
    count: number
}
const view = (state: State, updateState: (newState: Partial<State>) => void) => {
    return h('div', [
        h('h1', state.count.toString()),
        h('button', { on: { click: () => updateState({ count: state.count + 1 })}}, 'Add'),
    ])
}
const initialState: State = { count: 0 }

const component = createComponent(view, initialState, 'app')
export { createComponent }
// function handleClick(count: number){
//     component.updateState({ count: count + 1 })
// }
// const boundHandleClick = handleClick.bind(null, component.state.count)
// component.view = (state: State) => view(state, boundHandleClick)-