import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';

const Container = styled.div`
    height: 100vh;
    padding: 1rem;
`;


export default function BosMain() {
    return (
        <Container>
            <VmComponent
                src="ciocan.near/widget/bos-showcase"
            />
        </Container>
    )
}