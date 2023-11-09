import { init, h, VNode, toVNode } from 'snabbdom'
import { propsModule } from 'snabbdom'
import { eventListenersModule } from 'snabbdom'

const patch = init([propsModule, eventListenersModule])

type State = {
    count: number
}

class Component{
    state: State;
    view: (state: State, updateState: (newState: Partial<State>)=>void) =>VNode;
    vnode: VNode;
    container: Element;

    constructor(view: (state: State, updateState: (newState: Partial<State>)=> void) => VNode, initialState: State, container: Element){
        this.state = initialState
        this.view = view
        this.container = container
        this.vnode = this.container as unknown as VNode

        this.render()
        console.log('Component mounted.')
    }
updateState(newState: Partial<State>): void{
    this.state = { ...this.state, ...newState }
    this.render()
    console.log(
        'State updated', this.state)
}
private render(): void{
    const newVNode = this.view(this.state, this.updateState.bind(this))
    this.vnode = patch(this.vnode, newVNode)
}
}
function createComponent(view: (state: State, updateState: (newState: Partial<State>) => void)=> VNode, initialState: State, containerId: string): Component{
    const container = document.getElementById(containerId)
    if(!container) throw new Error(`No element found with id '${containerId}'`)
    return new Component(view, initialState, container)
}
export default createComponent
