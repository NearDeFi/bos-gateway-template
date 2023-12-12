import { useEffect, useState } from "react"
import styled from 'styled-components';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import type { CheckedState } from "@radix-ui/react-checkbox";

declare global {
    interface Window {
        __TAURI__: unknown;
    }
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(6px);
    background-color: rgba(0, 0, 0, 0.50);

    .content {
        color: black;
        padding: 4rem;
        margin: 4rem;
        background-color: white;
        border-radius: 4px;
        border: 1px solid #ccc;
        max-width: 800px;
    }

    h2 {
        font-size: 1.2rem;
        padding: 0.5rem 0;
    }

    button {
        all: unset;
    }

    .CheckboxRoot {
        background-color: #000;
        min-width: 20px;
        height: 20px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .CheckboxIndicator {
        color: white;
    }

    .Label {
        padding-left: 15px;
        line-height: 1.4rem;
    }

    div.checks {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    div.cb {
        display: flex;
    }

    a {
        color: black;
        text-decoration: underline;
    }

    button.agree {
        cursor: pointer;
        background-color: #000;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
    }
`;

export default function Disclaimer() {
    const [isTauri, setIsTauri] = useState(false)
    const [isAgreed, setAgreed] = useState(false)
    const [cb1, setCb1] = useState<CheckedState>(false)
    const [cb2, setCb2] = useState<CheckedState>(false)

    useEffect(() => {
        setIsTauri(!!window.__TAURI__)
    },[])

    const handleAgree = () => {
        if (cb1 && cb2) {
            setAgreed(true)
        }
    }

    if (!isTauri || Boolean(isAgreed)) {
        return null;
    }

    return (
        <Container>
            <div className="content">
                <h1>Disclaimer</h1>
                <h2>Please check the boxes below to confirm you have read the End User License Agreement and associated Disclaimers (“EULA”).</h2>
                <div className="checks">
                    <div className="cb">
                        <Checkbox.Root className="CheckboxRoot" id="c1" checked={cb1} onCheckedChange={setCb1}>
                            <Checkbox.Indicator className="CheckboxIndicator">
                                <CheckIcon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label className="Label" htmlFor="c1">
                            I have read and understood the <a href="https://github.com/NearDeFi/bos-gateway-template/blob/main/LICENSE" target="_blank">EULA</a>, that such understanding is irrevocable and will apply to my use of the Software without me providing confirmation in each specific instance.
                        </label>
                    </div>
                    <div className="cb">
                        <Checkbox.Root className="CheckboxRoot" id="c2" checked={cb2} onCheckedChange={setCb2}>
                            <Checkbox.Indicator className="CheckboxIndicator">
                                <CheckIcon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label className="Label" htmlFor="c2">
                            I acknowledge and agree that the Software is for informational purposes only. I acknowledge and agree that the developer or developers of the Software have no control over any blockchain, blockchain protocol, smart contract, or blockchain-based applications. Any interaction with a component or blockchain based application layer protocol is a locally run instance by me and not known to or otherwise under the control of the developer or developers of the Software.                    
                        </label>
                    </div>
                </div>
                <button className="agree" onClick={handleAgree}>I Agree</button>
            </div>
        </Container>
    )
}