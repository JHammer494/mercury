import React from 'react'
import Box from '@mui/material/Box'
import Container from './common/Container'
import {
  Features,
  Footer,
  Hero,
  Highlights,
  Headline,
  Content,
  FutureFeatures,
} from './components'

const Home = () => {
  return (
    <Box sx={{ paddingTop: '5vh' }}>
      <Box>
        <Container>
          <Hero />
        </Container>
      </Box>
      <Container>
        <Highlights />
      </Container>
      <Container>
        <Features />
      </Container>
      <Container>
        <FutureFeatures />
      </Container>
      <Box>
        <Box>
          <Container>
            <Headline />
          </Container>
        </Box>
        <Container maxWidth={800}>
          <Content />
        </Container>
      </Box>
      <Container>
        <Footer />
      </Container>
    </Box>
  )
}

export default Home

// const images = [
//   {
//     label: 'B-52H',
//     imgPath: 'https://i.ibb.co/s2yy30B/7133293.jpg',
//   },
//   {
//     label: 'B-1',
//     imgPath: 'https://i.ibb.co/pZWr18C/7169610.jpg',
//   },
//   {
//     label: 'B-2',
//     imgPath: 'https://i.ibb.co/YNFV7nb/5047431.jpg',
//   },
// ]
