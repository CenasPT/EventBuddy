import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: { // A SER USADO
        flex: 1,
        backgroundColor: "#161616",
        paddingHorizontal: 16,
        paddingTop: 24,
    },

    // Cards
    cardWrapper: { // A USAR
        marginVertical: 12,
        borderRadius: 20,
        overflow: "hidden",
        width: width - 32,
        alignSelf: "center",
        position: "relative", 
    },

    cardWrapperDetails: { // A USAR
        position: "relative",
        width: width,
        alignSelf: "center",
        alignItems: "center",
        
    },

    cardDetails: { // A SER USADO
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "20%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },

/*
    card: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        minHeight: 200,
        justifyContent: "flex-end",
        position: "relative",
    },*/

    cardImage: { // A SER USADO
        width: "100%",
        height: 200,
        borderRadius: 20,
    },

    cardImageExtra: { // A SER USADO
        width: width,
        height: 400,
        resizeMode: "cover",
    },    
/*
    cardTextContainer: {
        alignItems: "flex-start", 
    },*/

    cardTitle: { // A SER USADO
        fontSize: 24,
        fontWeight: "500",
        color: "#fff",
        marginVertical: 2,
        textShadowColor: "rgba(0,0,0,0.7)",
    },

    cardText: { // A SER USADO
        fontSize: 16,
        color: "#ddd",
        marginVertical: 2,
    },

    blurBox: { // A SER USADO
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        paddingTop: 20,  
        paddingLeft: 20,  
        paddingRight: 12,
        paddingBottom: 10,    
        borderRadius: 20,
        overflow: "hidden",
    },

    // Text and Titles
    titleSmall: { // A SER USADO
        fontSize: 24,
        fontWeight: "500",
        color: "#fff",
        marginVertical: 16,
        textShadowColor: "rgba(0,0,0,0.7)",
    },

    TextRegular: { // A SER USADO
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
        marginVertical: 4,
    },

    /*subtitle: {
        fontSize: 16,
        color: "#ccc",
        marginBottom: 8,
    },
*/
    
/*
    closeText: {
        color: "#fff",
        fontWeight: "600",
    },

    label: {
        color: "#eee",
        marginBottom: 6,
        fontWeight: "600",
    },    */

    // Text Inputs
    textInput: { //A SER USADO
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#747474",
        padding: 10,
        marginVertical: 16,
        color: "#eee",
        backgroundColor: "rgba(68, 68, 68, 0.2)",
    },

    searchBox: { // A SER USADO
        backgroundColor: "rgba(68, 68, 68, 0.2)",
        borderColor: "#747474",
        borderWidth: 1,
        borderRadius: 2,
        padding: 10,
        marginVertical: 16,
    },

    // Images
    favoriteIcon: { // A SER USADO
        position: "absolute",
        bottom: 16,
        right: 16,
        zIndex: 10,
    },

    /*participantsText: {
        fontSize: 14,
        color: "#bbb",
        marginBottom: 20,
        fontWeight: "600",
    },*/

    // Favorites screen
    eventCard: { // A SER USADO
        minHeight: 120,
        padding: 16,
        margin: 12,
        backgroundColor: "rgba(68, 68, 68, 0.2)",
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    eventImage: { // A SER USADO
        position: "absolute",
        right: 10,
        width: 100,
        height: 100,
        borderRadius: 12,
        zIndex: -1,
        color: "rgba(68, 68, 68, 0.2)",
        filter: "blur(1px), brightness(0.5), grayscale(0.5)",        
    },
    eventTitle: { // A SER USADO
        fontSize: 18,
        fontWeight: "500",
        color: "#fff",
    },
    
    // Modal
    modalBackground: { // A SER USADO
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        padding: 20,
    },
    modalContainer: { // A SER USADO
        backgroundColor: "rgba(16, 16, 16, 0.9)",
        borderColor: "#747474",
        borderWidth: 1,
        borderRadius: 12,
        padding: 20,
    },

    // Random
    rowAlign: { // A SER USADO
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
    },
    rowAlignSpaced: { // A SER USADO
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
    },
});

