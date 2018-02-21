<?php
/**
 * Block.php
 *
 * @package colbycomms/multipage-panel
 */

namespace ColbyComms\MultipagePanel;

/**
 * Renders the block.
 */
class Block {
	const OPTIONS_DEFAULTS = [];

	/**
	 * Checks whether the options are valid.
	 *
	 * @param array $options The options.
	 * @return boolean Whether they are valid.
	 */
	public static function options_are_valid( $options = [] ) : bool {
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
		$options = is_array( $options ) ? $options : [];
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

		ob_start();
		?>
	<div class="wp-block-multipage-panel-multipage-panel" data-multipage-panel>
		<div class="wp-block-multipage-panel-multipage-panel__inner">
			<?php echo $content; ?>
		</div>
	</div>
		<?php

		return ob_get_clean();
	}
}
