<?php
/**
 * PageBlock.php
 *
 * @package colbycomms/multipage-panel
 */

namespace ColbyComms\MultipagePanel;

/**
 * Generates the HTML for a panel's inner pages.
 */
class PageBlock {
	const OPTIONS_DEFAULTS = [];

	/**
	 * Checks whether the options are valid.
	 *
	 * @param array $options The options.
	 * @return boolean Whether they are valid.
	 */
	public static function options_are_valid( $options = [] ) : bool {
		if ( ! isset( $options['id'] ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Renders the block.
	 *
	 * @param array $options Shortcode $atts or a passed-in array.
	 * @param string $content Shortcode content or a passed-in HTML string.
	 * @return string The generated HTML.
	 */
	public static function render( $options = [], $content = '' ) : string {
		$options = array_merge( self::OPTIONS_DEFAULTS, $options );
		$content = function_exists( 'apply_filters' )
			? apply_filters( 'the_content', $content )
			: $content;

		if ( empty( $content ) ) {
			return '';
		}

		if ( ! self::options_are_valid( $options ) ) {
			return '';
		}

		$class = isset( $options['class'] )
			? " class=\"{$options['class']}\""
			: '';

		ob_start();
		?>
	<div data-multipage-panel-page id="<?php echo esc_attr( $atts['id'] ); ?>"<?php echo $class; ?>>
		<?php echo $content; ?>
	</div>
		<?php

		return ob_get_clean();
	}
}
