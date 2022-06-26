import { Image, Linking, TextInput, View, Text, StyleSheet } from 'react-native';

export const EmptyView = () => {
    return (
        // Flat List Item
        <Text
            style={styles.emptyListStyle}
        // onPress={() => getItem(item)}

        >
            No Data Found
        </Text>
    );
}

const styles = StyleSheet.create({

    emptyListStyle: {
        marginTop: "50%",
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
    },
})