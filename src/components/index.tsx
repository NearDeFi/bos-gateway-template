import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';

const Container = styled.div`
    height: 100vh;
`;


export default function BosMain() {
    return (
        <Container>
            <VmComponent
                // src="ciocan.near/widget/hello-world"
                src="mattlock.near/widget/zk-evm-lp"
            />
        </Container>
    )
}