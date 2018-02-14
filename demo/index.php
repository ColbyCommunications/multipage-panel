<?php

register_shutdown_function( function() {
	print_r( error_get_last() );
} );

$options = [
	'background-image' =>'http://www.colby.edu/commencement/wp-content/uploads/sites/200/2013/12/commencement-header-2017-hats-01.jpg'
];

ob_start();

?>

<div data-multipage-panel-page id="first-page" class="container">
	<div class="page-content">
		<h2>First page</h2>
		<p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>. Integer elementum massa vel ligula congue, ac tincidunt nisl luctus. Aliquam massa elit, tincidunt ut dolor id, porta tempor orci. Nulla condimentum ut risus sed vulputate. Suspendisse in nunc viverra, blandit elit nec, scelerisque turpis. Etiam sollicitudin orci dui, eu pellentesque sem vulputate ut. Suspendisse consectetur imperdiet suscipit. Duis convallis lobortis arcu, quis mollis neque varius eget. Morbi iaculis vehicula ante. Curabitur molestie odio sed aliquet dictum. Maecenas sed faucibus lectus. Vivamus nec auctor nisl. Quisque neque lectus, facilisis ornare varius vel, lobortis nec odio. Nam convallis nulla vitae nulla tristique, at aliquet velit semper. Praesent eget lectus vel turpis dictum egestas. Nulla placerat dolor vel tempor pretium. Morbi dictum posuere dui sit amet euismod.

		<p>Sed eget venenatis lacus, ac viverra mi. Nulla scelerisque nulla lacus. In suscipit facilisis maximus. Proin placerat purus in mi porta, vitae ullamcorper odio tristique. Suspendisse a turpis et mi dictum convallis ut non est. Proin consectetur sem dolor, eu ornare enim consectetur nec. Nam sit amet odio dictum eros ultricies convallis in in est. Pellentesque lobortis quis elit at gravida. Donec non quam posuere, interdum sem nec, porttitor arcu. Sed auctor fermentum diam, in aliquet mauris porta vitae. Aenean sit amet nibh ac lectus sodales vehicula imperdiet et mi. Fusce neque lectus, consequat non sagittis eget, pellentesque nec tellus. Aenean sit amet felis velit.
	</div>
</div>
<div data-multipage-panel-page id="second-page" class="container">
	<div class="page-content">
		<h2>Second page</h2>
		<p>Ut sollicitudin non lectus eget ullamcorper. <a href="#">Aliquam sagittis sollicitudin finibus.</a> In euismod, metus quis imperdiet aliquam, nibh lectus consequat enim, eget commodo purus turpis dapibus massa. Mauris sit amet varius diam, sit amet viverra diam. Sed aliquet ut nulla at eleifend. Mauris vulputate dui a sapien malesuada dapibus. Cras rhoncus at ligula et volutpat. Vestibulum quam lacus, venenatis eu laoreet at, facilisis quis quam. Curabitur tristique porta neque, vitae lobortis tellus eleifend nec. Ut consequat arcu eu sapien fermentum commodo. Integer fermentum maximus malesuada.

		<p>Duis est nisi, ultrices et leo eget, faucibus imperdiet risus. Ut tristique turpis non lorem tristique, sed iaculis augue porta. Sed euismod cursus turpis, ac rutrum nisi semper viverra. Cras efficitur metus nec ligula sagittis aliquam. Donec eu gravida magna. Proin libero odio, vestibulum sit amet massa quis, sagittis fermentum felis. Etiam sem dolor, pharetra vel lacinia a, vehicula ac diam. Curabitur sit amet dictum erat. Donec vitae erat dictum risus iaculis convallis a tempor mauris.
	</div>
</div>
<div data-multipage-panel-page id="third-page" class="container">
	<div class="page-content">
		<h2>Third page</h2>

		<p><a href="#">Cras luctus odio non</a> pulvinar tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus leo sit amet purus fermentum, sit amet tincidunt velit vulputate. Vestibulum ornare metus ut lectus molestie pulvinar. Cras et dolor sed orci malesuada laoreet. Proin laoreet nec magna id vestibulum. Pellentesque ac odio eu velit commodo tristique nec eget diam.
	</div>
</div>
<?php

$content = ob_get_clean();

require dirname( __DIR__ ) . '/vendor/autoload.php';

?><!DOCTYPE html>
<html lang="en">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, user-scalable=0" />
<link rel="stylesheet" href="https://unpkg.com/bootstrap@4.0.0/dist/css/bootstrap.css" media="all" />
<link rel="stylesheet" href="../dist/multipage-panel.css" media="all" />
<title>
	Multipage Panel Demo
</title>
<style>
*, *:after, *:before {
	box-sizing: border-box;
}

body {
	margin: 0;
}

header, footer {
	padding: 1.5rem;
	text-align: center;
}

main {
	font-family: sans-serif;
	max-width: 768px;
	margin: 0 auto;
}

.page-content {
	padding: 3rem 1.5rem;
	max-width: 768px;
	margin: 0 auto;
	line-height: 1.682;
	font-size: 112%;
}
</style>
<header>
	<div class="btn-group">
		<a class="btn btn-success" href="#first-page">First Page</a>
		<a class="btn btn-success" href="#second-page">Second Page</a>
		<a class="btn btn-success" href="#third-page">Third Page</a>
	</div>
</header>
<main>
	<?php echo ColbyComms\MultipagePanel\Block::render( $options, $content ); ?>
</main>
<footer>
	<div class="btn-group">
		<a class="btn btn-success" href="#first-page">First Page</a>
		<a class="btn btn-success" href="#second-page">Second Page</a>
		<a class="btn btn-success" href="#third-page">Third Page</a>
	</div>
</footer>
<script src="../dist/multipage-panel.js"></script>
