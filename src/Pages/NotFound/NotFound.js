import { Container } from '@mui/material'
import React from 'react'
import Navigation from '../../Components/Navigation/Navigation'

export const NotFound = () => {
    return (
        <>
            <Navigation logo />
            <Container>
                <h1>404 Not Found</h1>
            </Container>
        </>
    )
}
