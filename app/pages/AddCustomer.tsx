import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyle } from '@/constants/globalStyles'
import DropDownTsxComponent from '@/components/dropDownComponent'
import TextInputComponent from '@/components/TextInputComponent'
import CustomDateComponent from '@/components/CustomDateComponent'
import APICall from '@/utils/CallApi'
import { ACTIVE_DELIVERY_AGENTS_LIST, ACTIVE_SUBSCRIPTION_LIST } from '@/constants/endpoints'
import { AddCustomerProps } from '../navigationTypes'
import CustomButtonComponent from '@/components/customButtonComponent'
import LoadingModal from '@/components/LoadingModal'


type payloadProps = {
    username: string,
    subscription: number,
    starting_date: Date,
    ending_date: Date,
    delivery_schedule: string,
    delivery_agent: number
}

type allSubscriptionsProps = {
    id: number,
    label: string,
    value: string
}

type activeDeliveryAgentsProps = {
    id: number,
    label: string,
    value: string
}

type Props = {
    navigation: AddCustomerProps
}

const AddCustomer = ({ navigation }: Props) => {
    const [ payload, setPayload ] = useState<Partial<payloadProps>>()
    const [ selectedSubscription, setSelectedSubscription ] = useState("")
    const [ selectedDeliverySchedule, setSelectedDeliverySchedule ] = useState("")
    const [ selectedDeliveryAgent, setSelectedDeliveryAgent ] = useState("")
    const [ allActiveSubscriptions, setAllActiveSubscriptions ] = useState<allSubscriptionsProps[]>([])
    const [ allActiveDeliveryAgents, setAllActiveDeliveryAgents ] = useState<activeDeliveryAgentsProps[]>([])
    const [loading, setLoading] = useState(false)

    const deliverySchedule = [
        { id: '0', label: 'Morning Only', value: 'Morning Only' },
        { id: '1', label: 'Evening only', value: 'Evening only' },
        { id: '2', label: 'Both', value: 'Both' }
      ]

    const FetchAllActiveCustomers = async () => {
        const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: ACTIVE_SUBSCRIPTION_LIST,
        showToast: false,
        navigation: navigation
        });
        setAllActiveSubscriptions(response)
    };

    const FetchAllActiveDeliveryAgents = async () => {
        const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: ACTIVE_DELIVERY_AGENTS_LIST,
        showToast: false,
        navigation: navigation
        });
        setAllActiveDeliveryAgents(response)
    };

    useEffect(() => {
        setLoading(true);

        FetchAllActiveCustomers();
        FetchAllActiveDeliveryAgents()

        setLoading(false);
    }, [])

    function handleSubscriptionSelection(id: number, text: string) {
        setSelectedSubscription(text)
        setPayload({...payload, subscription: id})
    }

    function handleDeliveryScheduleSelection(id: number, text: string) {
        setSelectedDeliverySchedule(text)
        setPayload({...payload, delivery_schedule: text})
    }

    function handleDeliveryAgentSelection(id: number, text: string) {
        setSelectedDeliveryAgent(text)
        setPayload({...payload, delivery_agent: id})
    }

    async function handleAddCustomer() {
        setLoading(true);
        const response = await APICall({
            method: "POST",
            Accept: "application/json",
            endPoint: ACTIVE_SUBSCRIPTION_LIST,
            showToast: false,
            navigation: navigation
        });
        setLoading(false);
    }

  return (
    <View style={ globalStyle.container }>
        <LoadingModal visible={loading} />
        <View style={globalStyle.subContainer}>
            <Text style={globalStyle.pageHeadingStyle}>Add Customer</Text>
            <TextInputComponent 
            placeHolder="Set Username"
            onTextChange={(text) => setPayload({...payload, username: text.toString()})}
            value={payload?.username}
            />
            <DropDownTsxComponent
                data={allActiveSubscriptions}
                placeHolder="Select Subscription"
                search={true}
                searchPlaceholder="Search for subscription"
                optionSelected={(id, text) => handleSubscriptionSelection(id, text)}
                value={selectedSubscription}
            />
            <CustomDateComponent
            fieldName="Select Starting Date"
            dateSelection={(text) => setPayload({...payload, starting_date: text})}
            />
            <DropDownTsxComponent
                data={deliverySchedule}
                placeHolder="Select Delivery Schedule"
                search={false}
                optionSelected={(id, text) => handleDeliveryScheduleSelection(id, text)}
                value={selectedDeliverySchedule}
            />
            <DropDownTsxComponent
                data={allActiveDeliveryAgents}
                placeHolder="Select Delivery Agent"
                search={false}
                optionSelected={(id, text) => handleDeliveryAgentSelection(id, text)}
                value={selectedDeliveryAgent}
            />
            <CustomButtonComponent 
            buttonName="Submit"
            onSubmit={() => handleAddCustomer()}
            />
        </View>
    </View>
  )
}

export default AddCustomer

const styles = StyleSheet.create({})
