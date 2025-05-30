import router from "@/router";

export default {
    navigateToErrorView() {
        // todo arendus valmis, kaota kommentaar
     //   router.push({name: 'errorRoute'})
    },

    navigateToLoginView() {
        router.push({name: 'loginRoute'})
    },

    navigateToGroomersView() {
        router.push({name: 'groomersRoute'})
    },

    navigateToGroomerView(groomerId) {
        router.push({
            name: 'groomerRoute',
            query: {
                groomerId: groomerId
            }
        })
    },
}