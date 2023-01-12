<template>
	<footer>
		<hr />
		<div id="uls">
			<div>
				<ul>
					<li>Roland Deleau</li>
					<li>Muskauer Strasse 20a<br>10997 Berlin</li>
				</ul>
			</div>
			<div>
				<ul>
					<li>Mail: <a href="mailto:roland@deleau.de">roland@deleau.de</a></li>
					<li>Phone: <a href="tel:+49 1575 3535828">+49 1575 3535828</a></li>
					<li>Website by <a href="https://moritzclc.me">Moritz</a></li>
				</ul>
			</div>
		</div>
		<p id="copyright">©{{new Date().getFullYear()}} Roland Deleau</p>
	</footer>
</template>

<style scoped lang="scss">
@import '@/assets/style/vars.scss';

footer {
	font-size: .9em;
	font-family: Quicksand;
	max-width: $max-content-width;
	padding: 2rem $content-padding;
	display: block;
	margin: 0 auto;
}
hr {
	margin-bottom: 2rem;
}
ul {
	margin: 2 auto;
	padding: 0;
	list-style: none;
	color: $text-color;
	a {
		color: inherit;
		text-decoration: none;
		font-weight: bold;
	}
}
#copyright {
	text-align: center;
	margin: 1rem 0;
}

@media screen and (min-width: $breakpoint) {
	#uls {
		display: flex;
		> * {
			flex: 1;
			display: flex;
			justify-content: center;
		}
		ul {
			display: inline-block;
			margin: 0 auto;
		}
		*:not(:last-child) {
			margin-right: 1rem;
		}
	}
}
</style>
