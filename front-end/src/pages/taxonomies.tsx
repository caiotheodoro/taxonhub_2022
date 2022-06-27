import { Box, Container, Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import { CustomButton } from '../components/CustomButton'
import { SendCSV } from '../components/SendCSV'
import { Stepper } from '../components/Stepper'
import { TableComponent } from '../components/TableComponent'
import { api } from '../services/api'
import { v4 as uuidv4 } from 'uuid'
import { parseCookies, setCookie } from 'nookies'
import { useDataset } from '../hooks/useDataset'
import { DoSearch } from '../components/DoSearch'




//generate random data with TaxonomiesListProps interface

interface TaxonomiesPageProps {
  token: string;
}

const Taxonomies = ({token}: TaxonomiesPageProps) => {
  const {step, dataset } = useDataset();



  let components = [
    {
      title: 'Step 1',
      component: <SendCSV />,
      height: '150px',
    },
    {
      title: 'Step 2',
      component: <DoSearch token={token} model={"taxonomy"} />,
      height: '150px',
    },
    {
      title: 'Step 3',
      component: <TableComponent dataset={dataset.dataset} model={"taxonomy"} />,
      height: '590px',
    },
    {
      title: 'Step 4',
      component: <a href={"http://localhost:3333/taxonomy/download?userId="+token}>
        <CustomButton icon={FiDownload}>Download</CustomButton>
        </a>,
      height: '150px',
    }
  ]
  const [currentComponents, setCurrentComponents] = useState([components[0]]);

  useEffect(() => {

    let newComponents = components.filter((component, index) => index < step);
    setCurrentComponents(
      newComponents
    );

  }, [step]);



  return (
    <Container
      maxW="8xl"
    >
      <Flex id="head" w={"100%"} p={{ sm: "1", md: "5" }} paddingBottom={'2px'} flexDir={{ base: 'column', md: 'column', lg: "column", xl: "column" }} >
        <Flex flexDir={"column"} w={'100%'} alignItems={"flex-start"} mt="100px" mb={"100px"} >
          {
            currentComponents.map((step, index) => {

              return (
                <Stepper
                  key={index}
                  isLastStep={index === currentComponents.length - 1}
                  height={step.height}
                >
                  <Box>
                    {step.component}
                  </Box>
                </Stepper>
              )
            })
          }
        </Flex>
      </Flex>
    </Container>
  )
}

export default Taxonomies


export const getServerSideProps = async (ctx: any) => {
  const { "usr.token": token } = parseCookies(ctx);

  if (!token) {

    let uuid = uuidv4();
    setCookie(ctx, 'usr.token', uuid, {
      maxAge: 60 * 60 * 24 * 7,
    });
    return {
      props: {
        token: uuid,
      },
    };
  }
  return {
    props: {
      token,
    },
  };
};