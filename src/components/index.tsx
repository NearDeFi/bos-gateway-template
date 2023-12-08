import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import Disclaimer from './Discalaymer';

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
            <Disclaimer />
        </Container>
    )
}