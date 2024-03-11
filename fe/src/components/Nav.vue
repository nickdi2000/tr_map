<template>
  <span>
    <nav class="bg-gray-800 navBar">
      <div class="mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start"
          >
            <div class="sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a
                  href="#"
                  class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                  @click="$emit('search')"
                  >Search Again</a
                >
                <a
                  href="https://triviarat.com/?utm_source=map"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >TriviaRat Home</a
                >
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="mt-2 mr-2">
              <p
                class="uppercase text-white bg-orange-900 rounded-md py-1 px-2 font-bold text-sm"
              >
                In Beta
              </p>
            </div>
            <button
              @click="show = !show"
              class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <Modal v-model:show="show">
      <div class="fade fadeinUp">
        <img src="/images/logo.png" class="logo-image" />
      </div>
      <div>
        Welcome to the <i>TriviaRat</i> Network, the ultimate destination for
        trivia enthusiasts seeking the thrill of live trivia events near them!
        Our platform is carefully crafted to bridge the gap between avid trivia
        players and the vibrant world of local trivia nights, ensuring you never
        miss out on the chance to showcase your knowledge and compete with
        like-minded individuals.
        <br />
        <strong class="newline">Still Perfecting Our Craft</strong>
        As we continue to enhance the Trivia Rat experience, please note that we
        are currently in beta. Our commitment to excellence means we're actively
        working to iron out any imperfections, and we're eager to hear your
        feedback as we strive to create the best possible platform for trivia
        lovers everywhere.

        <strong class="newline">Fresh, Reliable Trivia Listings</strong>
        We pride ourselves on our cutting-edge algorithm designed to keep our
        trivia listings as current as possible. This ensures that the
        information you see on our site is accurate, so you can plan your trivia
        outings with confidence.

        <strong class="newline">Seamless Experience for Hosts</strong>
        For hosts using the
        <a
          href="https://triviarat.com?utm_source=map"
          class="font-bold text-gray-300 underline hover:text-gray-100"
          >TriviaRat web app</a
        >, we offer an unparalleled level of convenience. Your events will be
        automatically verified (assuming you've enabled TR Network in settings),
        thanks to our sophisticated system that tracks game occurrences and
        participant numbers in real-time. This not only simplifies the process
        for you but also reinforces the credibility of the information provided
        to our users.

        <strong class="newline">Open to All Hosts</strong>
        Trivia hosts not currently utilizing the Trivia Rat app are still warmly
        invited to join our community by submitting their trivia events. To
        maintain the integrity of our listings, these submissions will undergo a
        quick additional verification process. Our aim is to ensure that every
        event listed on our platform is genuine, providing a reliable resource
        for trivia enthusiasts everywhere. There will be a form available soon,
        but in the mean time you may contact us directly.

        <strong class="newline">Get In Touch</strong>
        Have questions or concerns? We're here to help! Reach out to us at
        <a
          class="font-bold text-gray-300 underline hover:text-gray-100"
          href="mailto:map@triviarat.com"
        >
          map@triviarat.com</a
        >. Whether you're a trivia player eager to find your next event or a
        host looking to promote your trivia nights, Trivia Rat is your go-to
        source for all things trivia.
        <br />
        Join us at Trivia Rat Network and dive into the exciting world of trivia
        near you. Together, let's create a thriving community of trivia
        aficionados, united by our love for knowledge, competition, and fun. See
        you at the next trivia night!
      </div>

      <div class="mt-4">
        Contact:
        <a
          class="font-bold text-gray-300 underline hover:text-gray-100"
          href="mailto:map@triviarat.com"
        >
          map@triviarat.com</a
        ><br />
        Home:
        <a
          href="https://triviarat.com/?utm_source=map"
          class="font-bold text-gray-300 underline hover:text-gray-100"
          >TriviaRat.com</a
        >
      </div>
    </Modal>
  </span>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped>
.navBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.newline {
  display: block;
  margin-top: 1rem;
}
</style>
