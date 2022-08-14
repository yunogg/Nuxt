<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="title"
            >Customers
          </span>
          <v-spacer></v-spacer>
          <table-header-buttons
            :add="add"
            :reloadData="reloadData"
            :updateSearchPanel="updateSearchPanel"
          ></table-header-buttons>
        </v-card-title>
        <Table
          v-if="loading === false"
          :headers="headers"
          :items="items"
          :pagination="pagination"
          @edit="edit"
          @remove="remove"
        ></Table>
      </v-card>
    </v-flex>
    <search-panel
      :rightDrawer="rightDrawer"
      @cancelSearch="cancelSearch"
      @searchData="searchCustomers"
    >
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Frist Name"
            light
            v-model="searchFilter"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Last Name"
            light
            v-model="searchFilter"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Mobile"
            light
            v-model="searchFilter"
          ></v-text-field>
        </v-flex>
      </v-layout>
            <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Email"
            light
            v-model="searchFilter"
          ></v-text-field>
        </v-flex>
      </v-layout>
     
    </search-panel>

    <confirm-dialog
      :dialog="dialog"
      :dialogTitle="dialogTitle"
      :dialogText="dialogText"
      @onConfirm="onConfirm"
      @onCancel="onCancel"
    />
    <v-snackbar
      v-if="loading === false"
      :right="true"
      :timeout="2000"
      :color="mode"
      v-model="snackbar"
    >
      {{ notice }}
      <v-btn dark text @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>

// @Component({
//   components: {

//   }
// })
export default {
  name: 'App',
  data () {
    return {
      dialog : true,
      dialogTitle : "Customer Delete Dialog",
      dialogText : "Do you want to delete this customer?",
      showSearchPanel : false,
      right : true,
      search : "",
      pagination: {page:10, },
      headers : [
          { text: "First Name",value: "firstname" },
          { text: "Last Name", value: "lastname" },
          { text: "Email", value: "email" },
          { text: "Mobile", value: "mobile" },
          { text: "Reward", value: "rewards" },
          { text: "Membership", value: "membership" },
          { text: "", value: "actions", sortable: false }
    ]
    }
  },

  // edit(item) {
  //   (`customer/${item.id}`);
  // },

  // remove(item) {
  //   this.itemId = item.id;
  //   this.dialog = true;
  // },

  // add() {
  //   this.$router.push("NewCustomer");
  // },

  // onConfirm() {
  //   customerModule.deleteCustomer(this.itemId);
  //   this.dialog = false;
  // },

  // onCancel() {
  //   this.itemId = -1;
  //   this.dialog = false;
  // },

  // searchCustomers() {
  //   buildSearchFilters(this.searchFilter);
  //   this.query = buildJsonServerQuery(this.searchFilter);
  //   console.log(this.query)
  //   this.quickSearch = "";
  //   customerModule.searchCustomers(this.query);
  //   this.showSearchPanel = false;
  // },

  // clearSearchFilters() {
  //   this.showSearchPanel = !this.showSearchPanel;
  //   clearSearchFilters(this.searchFilter);
  //   customerModule.getAllCustomers();
  // },

  // reloadData() {
  //   this.query = "";
  //   customerModule.getAllCustomers();
  // },

  // updateSearchPanel() {
  //   this.rightDrawer = !this.rightDrawer;
  // },

  // cancelSearch() {
  //   this.showSearchPanel = false;
  // },

  // closeSnackbar() {
  //   appModule.closeNotice();
  // },

  // quickSearchCustomers(){
  // },

  // get items() {
  //   return customerModule.items;
  // },
  // get pagination() {
  //   return customerModule.pagination;
  // },
  // get loading() {
  //   return appModule.loading;
  // },
  // get mode() {
  //   return appModule.mode;
  // },
  // get snackbar() {
  //   return appModule.snackbar;
  // },

  // get notice() {
  //   return appModule.notice;
  // },

  // get rightDrawer() {
  //   return this.showSearchPanel;
  // },

  // set rightDrawer(_showSearchPanel) {
  //   this.showSearchPanel = _showSearchPanel;
  // },

  // get quickSearch() {
  //   return this.quickSearchFilter;
  // },
  // set quickSearch(val) {
  //   this.quickSearchFilter = val;
  //   this.quickSearchFilter && this.quickSearchCustomers();
  // },

  // created() {
  //   customerModule.getAllCustomers();
  // },

  // mounted() {}
}
</script>
