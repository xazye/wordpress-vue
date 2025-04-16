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

function sidebar_api($args=[],$sidebar="sidebar-footer")
{
    if(array_key_exists('sidebar',$args->get_params())){
        $sidebar = $args->get_params()['sidebar'];
    }
    ob_start();
    dynamic_sidebar($sidebar);
    $response_body = ob_get_clean();
    // wonky as shit
    // need to learn more
    return new WP_REST_Response(
        array(
            'sidebar' => $response_body
        )
    );
}

function vue_theme_sidebars(){
    register_sidebar(
        array(
            "name" => __('Footer Sidebar','vue-theme'),
            "id" => 'sidebar-footer',
            "description"=> __("A sidebar that is displayed in the footer", "vue-theme")
        )
    );
}
add_action("widgets_init","vue_theme_sidebars");

add_action( 'rest_api_init', function () {
    register_rest_route( 'myroutes', '/menu', array(
    'methods' => 'GET',
    'callback' => 'get_menu',
    // temporary solution
    // cause the docs don't want to load
    'permission_callback' => function() { return ''; }
    ) );
    register_rest_route( 'myroutes', '/sidebars', array(
    'methods' => 'GET',
    'callback' => 'sidebar_api',
    // temporary solution
    // cause the docs don't want to load
    'permission_callback' => function() { return ''; }
    ) );
} );