import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '@/constants/globalStyles'
import DropDownTsxComponent from '@/components/dropDownComponent'
import TextInputComponent from '@/components/TextInputComponent'
import CustomDateComponent from '@/components/CustomDateComponent'


type payloadProps = {
    subscription: number,
    starting_date: Date,
    ending_date: Date,
    delivery_schedule: string,
    delivery_agent: number
}

const AddCustomer = () => {
    const [ payload, setPayload ] = useState<Partial<payloadProps>>()

    const d = [
        {
            "id": 1,
            "label": "Buffalo + Milk + 500 ml + 47.0/-",
            "value": "Buffalo + Milk + 500 ml + 47.0/-"
        },
        {
            "id": 2,
            "label": "Cow + Milk + 500 ml + 60.0/-",
            "value": "Cow + Milk + 500 ml + 60.0/-"
        }
    ]

  return (
    <View style={ globalStyle.container }>
        <View style={globalStyle.subContainer}>
            <Text style={globalStyle.pageHeadingStyle}>Add Customer</Text>
            <DropDownTsxComponent
                data={d}
                placeHolder="Select Subscription"
                search={false}
                optionSelected={(text) => setPayload({...payload, subscription: text})}
            />
            <CustomDateComponent
            fieldName="Select Starting Date"
            dateSelection={(text) => setPayload({...payload, starting_date: text})}
            />
            <CustomDateComponent
            fieldName="Select Ending Date"
            dateSelection={(text) => setPayload({...payload, ending_date: text})}
            />
        </View>
    </View>
  )
}

export default AddCustomer

const styles = StyleSheet.create({})
