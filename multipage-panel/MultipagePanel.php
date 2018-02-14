<?php
/**
 * MultipagePanel.php
 *
 * @package colbycomms/multipage-panel
 */

namespace ColbyComms\MultipagePanel;

/**
 * Sets up the plugin.
 */
class MultipagePanel {
	/**
	 * Whether to load production assets.
	 *
	 * @var bool
	 */
	const PROD = false;

	/**
	 * Plugin text domain.
	 *
	 * @var string
	 */
	const TEXT_DOMAIN = 'multipage-panel';

	/**
	 * Vendor name.
	 *
	 * @var string
	 */
	const VENDOR = 'colbycomms';

	/**
	 * Version.
	 *
	 * @var string
	 */
	const VERSION = '1.0.0';

	/**
	 * String preceding this plugin's filter.
	 *
	 * @var string
	 */
	const FILTER_NAMESPACE = 'colbycomms__multipage_panel__';

	/**
	 * Filter name for whether to enqueue this plugin's style.
	 *
	 * @var string
	 */
	const ENQUEUE_STYLE_FILTER = self::FILTER_NAMESPACE . 'enqueue_style';

	/**
	 * Filter name for this plugin's dist directory.
	 *
	 * @var string
	 */
	const DIST_DIRECTORY_FILTER = self::FILTER_NAMESPACE . 'dist_directory';

	/**
	 * The plugin's shortcode tag.
	 *
	 * @var string
	 */
	const BLOCK_TAG = 'multipage-panel';

	/**
	 * The shortcode tag for a panel's inner pages.
	 *
	 * @var string
	 */
	const PAGE_TAG = 'multipage-panel-page';

	/**
	 * Add hooks.
	 */
	public function __construct() {
		add_action( 'init', [ __CLASS__, 'register_shortcodes' ] );
		add_action( 'init', [ __CLASS__, 'register_style' ] );
		add_action( 'wp_enqueue_scripts', [ __CLASS__, 'enqueue_style' ] );
		add_filter( 'template_redirect', [ __CLASS__, 'maybe_disable_style' ] );
	}

	/**
	 * Adds the shortcode.
	 */
	public static function register_shortcodes() {
		add_shortcode( self::BLOCK_TAG, [ Block::class, 'render' ] );
		add_shortcode( self::PAGE_TAG, [ PageBlock::class, 'render' ] );
	}

	/**
	 * Registers the plugin's style.
	 */
	public static function register_style() {
		$min  = self::PROD === true ? '.min' : '';
		$dist = self::get_dist_directory();

		wp_register_style(
			self::TEXT_DOMAIN,
			"$dist/" . self::TEXT_DOMAIN . "$min.css",
			[],
			self::VERSION
		);
	}

	/**
	 * Enqueue the stylesheet.
	 */
	public static function enqueue_style() {
		/**
		 * Filters whether to enqueue this plugin's stylesheet.
		 *
		 * @param bool Yes or no.
		 */
		if ( apply_filters( self::ENQUEUE_STYLE_FILTER, true ) !== true ) {
			return;
		}

		wp_enqueue_style( self::TEXT_DOMAIN );
	}

	/**
	 * Disable the stylesheet if the shortcode is not present.
	 */
	public static function maybe_disable_style() {
		global $post;

		if ( empty( $post ) ) {
			return;
		}

		if ( has_shortcode( $post->post_content, self::BLOCK_TAG ) ) {
			return;
		}

		add_filter(
			self::ENQUEUE_STYLE_FILTER, function() {
				return false;
			}, 1
		);
	}

	/**
	 * Gets the plugin's dist/ directory URL, whether this package is installed as a plugin
	 * or in a theme via composer. If the package is in neither of those places and the filter
	 * is not used, this whole thing will fail.
	 *
	 * @return string The URL.
	 */
	public static function get_dist_directory() : string {
		static $dist_directory;

		if ( ! empty( $dist_directory ) ) {
			return $dist_directory;
		}

		/**
		 * Filters the URL location of the /dist directory.
		 *
		 * @param string The URL.
		 */
		$dist = apply_filters( self::DIST_DIRECTORY_FILTER, '' );
		if ( ! empty( $dist ) ) {
			return $dist;
		}

		if ( file_exists( dirname( __DIR__, 3 ) . '/plugins' ) ) {
			return plugin_dir_url( dirname( __DIR__ ) . '/index.php' ) . 'dist';
		}

		$dist_directory = get_template_directory_uri()
			. '/vendor/' . self::VENDOR . '/' . self::TEXT_DOMAIN . '/dist/';

		return $dist_directory;
	}

}
