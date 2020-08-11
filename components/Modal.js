import React from 'react';
import { findDOMNode } from 'react-dom';

class Modal extends React.Component{
    componentDidMount(){
        const el = findDOMNode(this.props.modalRef.current);
        window.$(el).modal({backdrop:false, show: false})
    }
    componentDidUpdate(){
        const el = findDOMNode(this.props.modalRef.current);
        if(this.props.show){window.$(el).modal('show')}
        else{window.$(el).modal('hide')}
    }
    render(){
        return(
            <div className="modal fade" 
            ref={this.props.modalRef}
            id="modalOld"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{border:'none'}}>
                            <h5 className="modal-title" id="exampleModalLabel">
                                {this.props.title}
                            </h5>
                            <button type="button" className="close" aria-label="Close" onClick={this.props.close}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;
