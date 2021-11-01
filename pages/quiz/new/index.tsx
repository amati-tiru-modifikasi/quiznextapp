import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import {  
    Box,
    Button,
    Center,
    Container,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    SimpleGrid,
    Text,
    Textarea,
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Field, FieldArray, Form, Formik, getIn } from 'formik'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'

// komponen
import { useAuth } from '../../../src/lib/auth'
import { addQuizApi } from '../../../src/utils/service'
import Navbar from '../../../src/common/Navbar'


const optionData = [
    {
        label: 'Option A:',
    },
    {
        label: 'Option B:',
    },
    {
        label: 'Option C:',
    },
    {
        label: 'Option D:',
    },
]

const answerOption = [
    {
        label: 'A',
        answer: 0,
    },
    {
        label: 'B',
        answer: 1,
    },
    {
        label: 'C',
        answer: 2,
    },
    {
        label: 'D',
        answer: 3,
    },
]

const  Index = () => {

    const { auth, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!auth && !loading) {
            router.push('/signin?next=/quiz/new');
        }
    }, [ auth, loading])

    const questionsData = {
        title: '',
        options: [{ title: '' }, { title: '' }, { title: '' }, { title: '' }],
        answer: '0',
    };

    const initialValues = {
        title: '',
        description: '',
        questions: [questionsData]
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required('Required'),
        description: yup.string().required('Required'),
        questions: yup
            .array()
            .of(
                yup.object().shape({
                    title: yup.string().required('Required!'),
                    options: yup.array().of(
                        yup.object().shape({
                            title: yup.string().required('Required!')
                        })
                    )
                })
            )
            .required('Must add a questions')
    })

    const submitHandler = async (values, actions) => {
        try {
            values= {
                ...values,
                createdAt: new Date(),
                updatedAt: new Date(),
                questions: values.questions.map((question) => {
                    return {
                        ...question,
                        options: question.options.map((option) => {
                            return { ...option, optionId: uuidv4() }
                        }),
                        questionId: uuidv4()
                    }
                })
            }
        } catch (error) {
            console.log('Error: ',error)
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <>
        <Navbar />
        <Container
          maxW="3xl"
          mt={5}
          mb={5}
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          boxShadow="xl"
        >
          <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Field name="title">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.title && form.touched.title}
                    >
                      <FormLabel htmlFor="title" fontSize="xl">
                        Quiz Title
                      </FormLabel>
                      <Input {...field} id="title" />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                    >
                      <FormLabel htmlFor="description" fontSize="xl" mt={4}>
                        Quiz description
                      </FormLabel>
                      <Textarea {...field} id="description" />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="questions">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="questions" fontSize="xl" mt={4}>
                        Enter your question data:
                      </FormLabel>
                      <Box ml={4}>
                        
                      </Box>
                    </FormControl>
                  )}
                </Field>
                <Center>
                  <Button
                    colorScheme="green"
                    isLoading={props.isSubmitting}
                    type="submit"
                    disabled={!(props.isValid && props.dirty)}
                  >
                    Submit Quiz
                  </Button>
                </Center>
              </Form>
            )}
          </Formik>
        </Container>
      </>
    )
}

export default Index
