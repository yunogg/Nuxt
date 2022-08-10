<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="title"
            >Customers {{ pagination ? "(" + pagination.totalItems + ")" : "" }}
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
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Last Name"
            light
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Mobile"
            light
          ></v-text-field>
        </v-flex>
      </v-layout>
            <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Email"
            light
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
export default {

}
</script>

<style>

</style>