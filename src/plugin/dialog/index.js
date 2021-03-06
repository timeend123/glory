import React from 'react';
import ReactDOM from 'react-dom';
import DialogCore from './dialogCore'





const mount = document.getElementById('dialog')
const curryFn = method => result => {
    ReactDOM.unmountComponentAtNode(mount) 
    method(result) 
}
const white = {background:"#e1e1e1",width:'400px',margin:'0 auto'}

export const $dialog = (renderFn = () => <div></div>, cb = () => {}, props = {}) => 
    new Promise((resolve, rej) => {

        ReactDOM.render(
            <DialogCore 
                resolve={curryFn(resolve)}
                rej={curryFn(rej)}
                renderFn={renderFn}
                {...props}
             />,
            mount,
            cb
        )
    })



export const $dialogConfirm = (content) => 
        $dialog(() => (
            <div>
                {content}
            </div>
        ))


export const $dialogAuto = content => 
        $dialog((dialogContext) => {

            setTimeout(() => {
                dialogContext.props.resolve()
            }, 2000)

            return (
                <div style={white}>
                    {content}
                </div>
            )
        }, () => {}, {simple: true})