<?php

if (!defined('ABSPATH')){
    exit; // don't allow to view the wordpress 
}

register_nav_menus(
    array(
        'primary' => __( 'Primary Menu', 'vuetemplate' ),
    )
);

function get_menu($args=[],$location = "primary" ) {
     // Get all locations
     $locations = get_nav_menu_locations();
     // Get object id by location
     $object = wp_get_nav_menu_object( $locations[$location] );
     $menu_items = wp_get_nav_menu_items( $object->name, $args );
  
     // Return menu post objects
     return $menu_items;
    // return wp_get_nav_menu_items('primary');
}

add_action( 'rest_api_init', function () {
        register_rest_route( 'myroutes', '/menu', array(
        'methods' => 'GET',
        'callback' => 'get_menu',
    ) );
} );