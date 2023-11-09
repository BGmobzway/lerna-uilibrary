import { init } from 'snabbdom';
import { propsModule } from 'snabbdom';
import { eventListenersModule } from 'snabbdom';
const patch = init([propsModule, eventListenersModule]);
class Component {
    constructor(view, initialState, container) {
        this.state = initialState;
        this.view = view;
        this.container = container;
        this.vnode = this.container;
        this.render();
        console.log('Component mounted.');
    }
    updateState(newState) {
        this.state = Object.assign(Object.assign({}, this.state), newState);
        this.render();
        console.log('State updated', this.state);
    }
    render() {
        const newVNode = this.view(this.state, this.updateState.bind(this));
        this.vnode = patch(this.vnode, newVNode);
    }
}
function createComponent(view, initialState, containerId) {
    const container = document.getElementById(containerId);
    if (!container)
        throw new Error(`No element found with id '${containerId}'`);
    return new Component(view, initialState, container);
}
export default createComponent;
