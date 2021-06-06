import { VscLoading } from 'react-icons/vsc';
import styled, { keyframes } from 'styled-components';

const load = keyframes`
from{
    transform: rotate(0deg);
    fill:white;
}
to{
    transform: rotate(360deg);
    fill:#77f077;
}
`;

export const LoadHolder = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Loading = styled(VscLoading)`
	fill: white;
	width: 150px;
	height: 150px;
	animation: ${load} 1000ms infinite;
`;
