import * as React from "react";
import styles from "./NoPadding.module.css";

interface Props {
    customWidth? : number,
    justify?: string,
    alignBase?: "baseline" | "flex-end" | "none",
    style?: Object
}

export const FormRow :  React.FC<Props> = (props) => {

    const generateRow = () => {

        if(props.children){
            //Multiple elements
            if(Array.isArray(props.children)){
                if(12 % props.children.length !== 0){
                    console.error("FormRow: Elements count must divide 12.")
                    return;
                }
                if(props.customWidth && (props.children.length * props.customWidth) > 12) {
                    console.error("FormRow: Elements count * customWidth must be less or equal to 12.")
                    return;
                }
                const length = props.children.length;
                const className = `p-col-12 p-md-${props.customWidth ? props.customWidth : 12/ length} `
                const items = props.children.map((el : any, index: number) => {
                    return <div key={index} className={className + ' ' + styles.noPadding + ' ' + styles.marginBottom }>
                        {el.props.name ?
                            <p className="p-radiobutton-label">{el.props.name}</p>
                            :null
                        }
                        {el}
                    </div>
                });

                return  <div style={{paddingBottom: "2em", alignItems: props.alignBase, ...props.style}} className={`p-grid p-fluid p-justify-${props.justify}`}>
                    <div style={{margin: "auto", display: "contents"}} className={"p-col-12 " + styles.noPadding + ' ' + styles.marginBottom}>
                        {items}
                    </div>
                </div>
            }
            //Single elements
            else{
                let par = <div></div>;
                const className = `p-col-12 p-md-${props.customWidth ? props.customWidth : 12} `
                //@ts-ignore
                if(props.children.props.name){
                    //@ts-ignore
                    par = <p className="p-radiobutton-label">{props.children.props.name}</p>
                }
                return <div style={{paddingBottom: "2em", alignItems: props.alignBase, ...props.style}} className={`p-grid p-fluid p-justify-${props.justify}`}>
                    <div key={Math.random()} className={className + styles.noPadding }>
                        {par}
                        {props.children}
                    </div>
                </div>
            }
        }else{
            console.error("FormRow: No elements provided!")
            return;
        }
    };


    return <>
        {generateRow()}
    </>

};

FormRow.defaultProps = {
    justify: "center",
    alignBase: "none"
}