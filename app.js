Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 1,
      gameOverMessage: null,
      logMessages: []
    }
  },

  computed: {
    monsterHealthBarStyles() {
      if(this.monsterHealth <= 0) {
        return {width: '0%'};
      }
      return {width: this.monsterHealth + '%'};
    },

    playerHealthBarStyles() {
      if(this.playerHealth <= 0) {
        return {width: '0%'};
      }
      return {width: this.playerHealth + '%'};
    },

    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },

  watch: {
    playerHealth(value) {
      if(value <= 0 && this.monsterHealth <= 0) {
        this.gameOverMessage = "It's a draw!";
      }
      else if(value <= 0) {
        this.gameOverMessage = "You Lost!"
      }
    },

    monsterHealth(value) {
      if(value <= 0 && this.playerHealth <= 0) {
        this.gameOverMessage = "It's a draw!";
      }
      else if(value <= 0) {
        this.gameOverMessage = "You Won!";
      }
    }
  },

  methods: {
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.gameOverMessage = null;
      this.logMessages = [];
    },

    attackMonster() {
      this.currentRound++;
      var attackValue = getRandomValue(5, 20);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);

      this.attackPlayer();
    },

    attackPlayer() {
      var attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },

    playerSpecialAttack() {
      this.currentRound++;
      var attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);

      this.attackPlayer();
    },

    healPlayer() {
      this.currentRound++;
      var healValue = getRandomValue(8, 20);
      this.playerHealth += healValue;
      if(this.playerHealth > 100) this.playerHealth = 100;
      this.addLogMessage('player', 'heal', healValue);

      this.attackPlayer();
    },

    surrender() {
      this.gameOverMessage = "You Flew!"
    },

    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    }
  }
})
.mount('#game');

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}