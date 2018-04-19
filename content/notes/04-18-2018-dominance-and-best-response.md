---
title: Dominance and Best Response
date: '2018-04-18'
tags:
  - game theory
author: Felix Jen
draft: false
type: notes
---
## Game Theory Basics

### Definition: Normal Form Game

* Players $ i \in 1..n $
* For every player $i$, $\exists$ a set of strategies $S_i : s_i \in S_i$
* $\forall i \land \forall S_i, S = \{s_1..s_n\} \lor S = \{s_i,S_j\}: s_j = \{s_1, .. s_{i-1}, s_{i+1}, .. s_n\}$

### Notation

If there are two players, $i \land j \implies U_i(s_i,s_j) \land U_j(s_j,s_i)$. Note that discussions of utility and strategy choices always take the player in perspective as the first argument and the other players are subsequent arguments.

## Prisoner's Dilemma

$ \exists i \in {1,2\}:$

$$
\begin{array}{cccc}
& & \multicolumn{2}{c}{2}\\
& & C & D
\end{array}
$$
