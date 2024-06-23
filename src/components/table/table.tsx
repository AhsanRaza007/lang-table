import { useState } from "react";
import styles from "./table.module.css";

export default function Table({ jsonList }) {
    const [en, setEnJson] = useState(jsonList.en);
    const [es, setEsJson] = useState(jsonList.es);
    const [pb, setPbJson] = useState(jsonList.pb);
    const enNestedKeys = Object.keys(en);
    const esNestedKeys = Object.keys(es);
    const pbNestedKeys = Object.keys(pb);
    const uniqueKeyList = Array.from(new Set([...enNestedKeys, ...esNestedKeys, ...pbNestedKeys]));
    const childKeys = {};
    const disabledInputChilds = {}
    uniqueKeyList.forEach((key) => {
        const enChildKeys = Object.keys(en[key]);
        const esChildKeys = Object.keys(es[key]);
        const pbChildKeys = Object.keys(pb[key]);
        disabledInputChilds[key] = {}
        enChildKeys.forEach((key2)=> {
            disabledInputChilds[key][key2] = {
                en: true
            };
        })
        esChildKeys.forEach((key2)=> {
            disabledInputChilds[key][key2] = {
                ...disabledInputChilds[key][key2],
                es: true,
            };
        })
        pbChildKeys.forEach((key2)=> {
            disabledInputChilds[key][key2] = {
                ...disabledInputChilds[key][key2],
                pb: true
            };
        })
        childKeys[key] = Array.from(new Set([...enChildKeys, ...esChildKeys, ...pbChildKeys]));
        
    });

    const [disabledInputs, setDisabledInputs] = useState(disabledInputChilds)
    const updateEn = (evt, parentKey, childKey) => {
        setEnJson((oldEn) => {
            const newEn = {...oldEn}
            newEn[parentKey][childKey] = evt;
            return newEn
        })
    }
    const updateEs = (val, parentKey, childKey) => {
        setEsJson((oldEs) => {
            const newEn = {...oldEs}
            newEn[parentKey][childKey] = val;
            return newEn
        })
    }

    const updatePb = (val, parentKey, childKey) => {
        setPbJson((oldEs) => {
            const newEn = {...oldEs}
            newEn[parentKey][childKey] = val;
            return newEn
        })
    }

    const updateDisabledKeys = (langCode, parenKey, childKey) => {
        setDisabledInputs((old) => {
            const newInputState = JSON.parse(JSON.stringify(old))
            console.log(newInputState[parenKey][childKey][langCode])
            newInputState[parenKey][childKey][langCode] = !newInputState[parenKey][childKey][langCode];
            console.log(newInputState[parenKey][childKey][langCode])
            return newInputState;
        })
    }


    
    return (
        <>
            <h1>Language List Table</h1>
            <table className={styles.contentTable}>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>en value</th>
                        <th>es value</th>
                        <th>pb value</th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueKeyList.map((parentKey) => (
                        <>
                            <tr className={styles.full_row}>
                                <td colSpan={4}>{parentKey}</td>
                            </tr>
                            {childKeys[parentKey].map((childKey) => (
                                <>
                                    <tr>
                                        <td>{childKey}</td>
                                        <td className={styles.editable_tr}>
                                            <div className={styles.input_container}>
                                                <input type="text" 
                                                disabled={disabledInputs[parentKey][childKey]['en']}
                                                onChange={(val) => updateEn(val.target.value, parentKey, childKey)}
                                                title={en[parentKey][childKey]}
                                                value={en[parentKey][childKey]} />
                                                <button onClick={() => updateDisabledKeys('en', parentKey, childKey)} className={styles.edit_save_btn}>
                                                    {
                                                        disabledInputs[parentKey][childKey]['en']? 
                                                        <>✏️</> :<>📥</> 
                                                    }</button>
                                            </div>
                                        </td>
                                        <td className={styles.editable_tr}>
                                            <div className={styles.input_container}>
                                                <input type="text" 
                                                onChange={(val) => updateEs(val.target.value, parentKey, childKey)}
                                                disabled={disabledInputs[parentKey][childKey]['es']} 
                                                title={es[parentKey][childKey]}
                                                value={es[parentKey][childKey]} />
                                                <button onClick={() => updateDisabledKeys('es', parentKey, childKey)} className={styles.edit_save_btn}>
                                                {
                                                        disabledInputs[parentKey][childKey]['es']? 
                                                        <>✏️</> :<>📥</> 
                                                    }</button>
                                            </div>
                                        </td>
                                        <td className={styles.editable_tr}>
                                            <div className={styles.input_container}>
                                                <input type="text" 
                                                onChange={(val) => updatePb(val.target.value, parentKey, childKey)}
                                                disabled={disabledInputs[parentKey][childKey]['pb']}
                                                title={pb[parentKey][childKey]}
                                                value={pb[parentKey][childKey]} />
                                                <button onClick={() => updateDisabledKeys('pb', parentKey, childKey)} className={styles.edit_save_btn}>
                                                {
                                                        disabledInputs[parentKey][childKey]['pb']? 
                                                        <>✏️</> :<>📥</> 
                                                    }</button>

                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </>
                    ))}
                </tbody>
            </table>
        </>
    );
}
