'use client';

import { useState } from 'react';
import { AppleIcon, GoogleIcon, InstagramIcon, WhatsAppIcon } from '@/assets/icons';
import {
  Button,
  Card,
  Input,
  Checkbox,
  SegmentedControl,
  Toggle,
  Typography,
} from '@/components/ui';

function BellIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#0F14198C',
          marginBottom: 12,
        }}
      >
        {label}
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const TAB_OPTIONS = [
  { label: 'Repes', value: 'repes' },
  { label: 'Faltan', value: 'faltan' },
  { label: 'Matches', value: 'matches' },
];

export default function ComponentDocsPage() {
  const [tab, setTab] = useState('repes');
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(false);
  const [toggleCard, setToggleCard] = useState(true);

  return (
    <div
      style={{
        padding: '40px 32px',
        maxWidth: 800,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Button</h1>
      <p style={{ color: '#0F14198C', marginBottom: 48 }}>
        variant + color + size — icons are the consumer&apos;s responsibility.
      </p>

      {/* Variants */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Variants · color=&quot;default&quot;
        </h2>
        <Row label="primary">
          <Button variant="primary">Primary</Button>
        </Row>
        <Row label="secondary">
          <Button variant="secondary">Secondary</Button>
        </Row>
        <Row label="ghost">
          <Button variant="ghost">Ghost</Button>
        </Row>
        <Row label="danger">
          <Button variant="danger">Delete account</Button>
        </Row>
        <Row label="icon-only">
          <Button variant="icon-only" aria-label="Notifications">
            <BellIcon />
          </Button>
        </Row>
      </section>

      {/* Color green */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Variants · color=&quot;green&quot;
        </h2>
        <Row label="primary + green">
          <Button variant="primary" color="green">
            Confirm trade
          </Button>
        </Row>
        <Row label="secondary + green">
          <Button variant="secondary" color="green">
            View offer
          </Button>
        </Row>
        <Row label="ghost + green (color ignored)">
          <Button variant="ghost" color="green">
            Ghost stays neutral
          </Button>
        </Row>
        <Row label="danger + green (color ignored)">
          <Button variant="danger" color="green">
            Danger stays coral
          </Button>
        </Row>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Sizes
        </h2>
        <Row label="sm · 36px / 13px">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="primary" color="green" size="sm">
            Small green
          </Button>
        </Row>
        <Row label="md · 48px / 15px (default)">
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="secondary" size="md">
            Medium
          </Button>
          <Button variant="primary" color="green" size="md">
            Medium green
          </Button>
        </Row>
        <Row label="lg · 56px / 17px">
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
          <Button variant="primary" color="green" size="lg">
            Large green
          </Button>
        </Row>
      </section>

      {/* With icons */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          With icons
        </h2>
        <Row label="leftIcon">
          <Button variant="primary" leftIcon={<PlusIcon />}>
            Add sticker
          </Button>
          <Button variant="primary" color="green" leftIcon={<PlusIcon />}>
            Add sticker
          </Button>
        </Row>
        <Row label="rightIcon">
          <Button variant="secondary" rightIcon={<ArrowRightIcon />}>
            View collection
          </Button>
          <Button
            variant="secondary"
            color="green"
            rightIcon={<ArrowRightIcon />}
          >
            View collection
          </Button>
        </Row>
        <Row label="icon-only">
          <Button variant="icon-only" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button variant="icon-only" aria-label="Notifications">
            <BellIcon />
          </Button>
          <Button variant="icon-only" aria-label="Delete">
            <TrashIcon />
          </Button>
        </Row>
      </section>

      {/* States */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          States
        </h2>
        <Row label="loading">
          <Button variant="primary" loading>
            Primary
          </Button>
          <Button variant="primary" color="green" loading>
            Green
          </Button>
          <Button variant="secondary" loading>
            Secondary
          </Button>
        </Row>
        <Row label="disabled">
          <Button variant="primary" disabled>
            Primary
          </Button>
          <Button variant="primary" color="green" disabled>
            Green
          </Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="danger" disabled>
            Danger
          </Button>
          <Button variant="icon-only" disabled aria-label="Bell">
            <BellIcon />
          </Button>
        </Row>
      </section>

      {/* fullWidth */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          fullWidth
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" fullWidth>
            Full width primary
          </Button>
          <Button variant="primary" color="green" fullWidth>
            Full width green
          </Button>
          <Button variant="secondary" fullWidth>
            Full width secondary
          </Button>
        </div>
      </section>

      {/* ── Input ───────────────────────────────────────────── */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 900,
          marginBottom: 8,
          marginTop: 64,
        }}
      >
        Input
      </h1>
      <p style={{ color: '#0F14198C', marginBottom: 48 }}>
        search and password icons are internal — all others go via leftIcon.
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Types
        </h2>

        <Row label="text">
          <Input
            type="text"
            label="Full name"
            placeholder="Jesus Varela"
            leftIcon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            }
          />
        </Row>

        <Row label="email">
          <Input
            type="email"
            label="Email"
            placeholder="jesus@example.com"
            leftIcon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            }
          />
        </Row>

        <Row label="password (toggle built-in)">
          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            leftIcon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
          />
        </Row>

        <Row label="search (icon built-in)">
          <Input type="search" label="Search" />
        </Row>

        <Row label="tel">
          <Input
            type="tel"
            label="Phone"
            placeholder="+54 11 1234-5678"
            leftIcon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
              </svg>
            }
          />
        </Row>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          States
        </h2>

        <Row label="error">
          <Input
            type="email"
            label="Email"
            defaultValue="notanemail"
            state="error"
            errorMessage="Enter a valid email address."
          />
        </Row>

        <Row label="disabled">
          <Input
            type="text"
            label="Username"
            defaultValue="jesus_varela"
            state="disabled"
          />
        </Row>
      </section>

      {/* ── Checkbox ─────────────────────────────────────────── */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 900,
          marginBottom: 8,
          marginTop: 64,
        }}
      >
        Checkbox
      </h1>
      <p style={{ color: '#0F14198C', marginBottom: 48 }}>
        accent drives the fill color — the component knows nothing about repes
        or faltan.
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Accents &amp; states
        </h2>

        <Row label="unchecked (default)">
          <Checkbox label="Sticker 42" />
          <Checkbox label="Sticker 43" />
          <Checkbox label="Sticker 44" />
        </Row>

        <Row label='checked · accent="green" (repes)'>
          <Checkbox label="Sticker 42" accent="green" defaultChecked />
          <Checkbox label="Sticker 43" accent="green" defaultChecked />
          <Checkbox label="No label" accent="green" defaultChecked />
        </Row>

        <Row label='checked · accent="coral" (faltan)'>
          <Checkbox label="Sticker 07" accent="coral" defaultChecked />
          <Checkbox label="Sticker 08" accent="coral" defaultChecked />
          <Checkbox label="No label" accent="coral" defaultChecked />
        </Row>

        <Row label="disabled unchecked">
          <Checkbox label="Sticker 99" disabled />
        </Row>

        <Row label="disabled checked">
          <Checkbox label="Sticker 99" accent="green" defaultChecked disabled />
          <Checkbox label="Sticker 99" accent="coral" defaultChecked disabled />
        </Row>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          variant=&quot;card&quot;
        </h2>

        <Row label="unchecked">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              width: '100%',
              maxWidth: 320,
            }}
          >
            <Checkbox variant="card" label="Sticker 42" />
            <Checkbox variant="card" label="Sticker 43" />
          </div>
        </Row>

        <Row label='checked · accent="green"'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              width: '100%',
              maxWidth: 320,
            }}
          >
            <Checkbox
              variant="card"
              accent="green"
              label="Sticker 42"
              defaultChecked
            />
            <Checkbox
              variant="card"
              accent="green"
              label="Sticker 43"
              defaultChecked
            />
          </div>
        </Row>

        <Row label='checked · accent="coral"'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              width: '100%',
              maxWidth: 320,
            }}
          >
            <Checkbox
              variant="card"
              accent="coral"
              label="Sticker 07"
              defaultChecked
            />
            <Checkbox
              variant="card"
              accent="coral"
              label="Sticker 08"
              defaultChecked
            />
          </div>
        </Row>

        <Row label="disabled">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              width: '100%',
              maxWidth: 320,
            }}
          >
            <Checkbox variant="card" label="Sticker 42" disabled />
            <Checkbox
              variant="card"
              accent="green"
              label="Sticker 43"
              defaultChecked
              disabled
            />
          </div>
        </Row>
      </section>

      {/* ── SegmentedControl ─────────────────────────────────── */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 900,
          marginBottom: 8,
          marginTop: 64,
        }}
      >
        SegmentedControl
      </h1>
      <p style={{ color: '#0F14198C', marginBottom: 48 }}>
        fully controlled — state lives in the parent.
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Interactive
        </h2>

        <Row label="3 options · active: {tab}">
          <div style={{ width: '100%', maxWidth: 400 }}>
            <SegmentedControl
              options={TAB_OPTIONS}
              value={tab}
              onChange={setTab}
            />
          </div>
        </Row>

        <Row label="disabled">
          <div style={{ width: '100%', maxWidth: 400 }}>
            <SegmentedControl
              options={TAB_OPTIONS}
              value="faltan"
              onChange={() => {}}
              disabled
            />
          </div>
        </Row>
      </section>

      {/* ── Toggle ───────────────────────────────────────────── */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 900,
          marginBottom: 8,
          marginTop: 64,
        }}
      >
        Toggle
      </h1>
      <p style={{ color: '#0F14198C', marginBottom: 48 }}>
        controlled — state lives in the parent. thumb animates with ease-snap
        overshoot.
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          variant=&quot;plain&quot;
        </h2>

        <Row label="checked">
          <Toggle
            checked={toggleA}
            onChange={setToggleA}
            label="Notificaciones"
          />
        </Row>

        <Row label="unchecked">
          <Toggle checked={toggleB} onChange={setToggleB} label="Modo oscuro" />
        </Row>

        <Row label="disabled checked">
          <Toggle
            checked={true}
            onChange={() => {}}
            label="Sin acceso"
            disabled
          />
        </Row>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          variant=&quot;card&quot;
        </h2>

        <Row label="checked">
          <Toggle
            variant="card"
            checked={toggleCard}
            onChange={setToggleCard}
            label="Activado"
          />
        </Row>

        <Row label="disabled">
          <Toggle
            variant="card"
            checked={false}
            onChange={() => {}}
            label="Disabled"
            disabled
          />
        </Row>
      </section>

      {/* ── Card ─────────────────────────────────────────────── */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 900,
          marginBottom: 8,
          marginTop: 64,
        }}
      >
        Card
      </h1>
      <p style={{ color: '#0F14198C', marginBottom: 48 }}>
        accent drives the shadow color — border is always ink.
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Accents
        </h2>

        <Row label="default">
          <Card accent="default">
            <Typography variant="body-sm" color="muted">
              accent=&quot;default&quot;
            </Typography>
            <Typography variant="title">Shadow ink</Typography>
          </Card>
        </Row>

        <Row label="green">
          <Card accent="green">
            <Typography variant="body-sm" color="muted">
              accent=&quot;green&quot;
            </Typography>
            <Typography variant="title">Shadow green</Typography>
          </Card>
        </Row>

        <Row label="coral">
          <Card accent="coral">
            <Typography variant="body-sm" color="muted">
              accent=&quot;coral&quot;
            </Typography>
            <Typography variant="title">Shadow coral</Typography>
          </Card>
        </Row>

        <Row label="yellow">
          <Card accent="yellow">
            <Typography variant="body-sm" color="muted">
              accent=&quot;yellow&quot;
            </Typography>
            <Typography variant="title">Shadow yellow</Typography>
          </Card>
        </Row>

        <Row label="purple">
          <Card accent="purple">
            <Typography variant="body-sm" color="muted">
              accent=&quot;purple&quot;
            </Typography>
            <Typography variant="title">Shadow purple</Typography>
          </Card>
        </Row>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Padding
        </h2>

        <Row label="none">
          <Card padding="none">
            <div style={{ background: '#0F14190A', padding: '12px 16px' }}>
              <Typography variant="body-sm" color="muted">
                padding=&quot;none&quot; — content controls its own spacing
              </Typography>
            </div>
          </Card>
        </Row>

        <Row label="sm · 16px">
          <Card padding="sm">
            <Typography variant="body-sm" color="muted">
              padding=&quot;sm&quot;
            </Typography>
            <Typography variant="title">Small padding</Typography>
          </Card>
        </Row>

        <Row label="md · 24px (default)">
          <Card padding="md">
            <Typography variant="body-sm" color="muted">
              padding=&quot;md&quot;
            </Typography>
            <Typography variant="title">Medium padding</Typography>
          </Card>
        </Row>

        <Row label="lg · 32px">
          <Card padding="lg">
            <Typography variant="body-sm" color="muted">
              padding=&quot;lg&quot;
            </Typography>
            <Typography variant="title">Large padding</Typography>
          </Card>
        </Row>
      </section>

      {/* ── Typography ───────────────────────────────────────── */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 900,
          marginBottom: 8,
          marginTop: 64,
        }}
      >
        Typography
      </h1>
      <p style={{ color: '#0F14198C', marginBottom: 48 }}>
        Archivo for display/headings — Inter for body/labels.
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 0,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Variants
        </h2>

        {(
          [
            {
              variant: 'display',
              spec: 'Archivo 900 · 56px · -0.04em',
              sample: 'Display',
            },
            {
              variant: 'h1',
              spec: 'Archivo 900 · 40px · -0.03em',
              sample: 'Heading 1',
            },
            {
              variant: 'h2',
              spec: 'Archivo 800 · 28px · -0.02em',
              sample: 'Heading 2',
            },
            {
              variant: 'title',
              spec: 'Archivo 800 · 18px · -0.01em',
              sample: 'Title',
            },
            {
              variant: 'body-lg',
              spec: 'Inter 600 · 15px · normal',
              sample:
                'Body large — the quick brown fox jumps over the lazy dog',
            },
            {
              variant: 'body-sm',
              spec: 'Inter 600 · 13px · normal',
              sample:
                'Body small — the quick brown fox jumps over the lazy dog',
            },
            {
              variant: 'label',
              spec: 'Inter 800 · 11px · 0.08em · uppercase',
              sample: 'Label text',
            },
            {
              variant: 'caption',
              spec: 'Inter 600 · 11px · normal',
              sample: 'Caption text',
            },
          ] as const
        ).map(({ variant, spec, sample }) => (
          <div
            key={variant}
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              alignItems: 'center',
              gap: 24,
              padding: '20px 0',
              borderBottom: '1px solid #0F14191A',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#0F1419',
                  marginBottom: 2,
                }}
              >
                {variant}
              </p>
              <p style={{ fontSize: 11, color: '#0F14198C' }}>{spec}</p>
            </div>
            <Typography variant={variant}>{sample}</Typography>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Colors
        </h2>
        <Row label='all colors · variant="body-lg"'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Typography variant="body-lg" color="default">
              color=&quot;default&quot; — texto principal
            </Typography>
            <Typography variant="body-lg" color="muted">
              color=&quot;muted&quot; — texto secundario
            </Typography>
            <Typography variant="body-lg" color="green">
              color=&quot;green&quot; — éxito / positivo
            </Typography>
            <Typography variant="body-lg" color="coral">
              color=&quot;coral&quot; — advertencia / faltantes
            </Typography>
            <Typography variant="body-lg" color="danger">
              color=&quot;danger&quot; — error
            </Typography>
            <span
              style={{
                background: '#0F1419',
                padding: '4px 8px',
                borderRadius: 8,
                display: 'inline-block',
              }}
            >
              <Typography variant="body-lg" color="white">
                color=&quot;white&quot; — sobre fondo oscuro
              </Typography>
            </span>
          </div>
        </Row>

        <Row label="truncate">
          <div style={{ width: 280 }}>
            <Typography variant="body-lg" truncate>
              Este texto es muy largo y debería cortarse con ellipsis cuando no
              entra en una línea
            </Typography>
          </div>
        </Row>
      </section>

      {/* ── Icons ────────────────────────────────────────────── */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 900,
          marginBottom: 8,
          marginTop: 64,
        }}
      >
        Icons
      </h1>
      <p style={{ color: '#0F14198C', marginBottom: 48 }}>
        Brand icons — Google uses fixed brand colors; Apple, Instagram and
        WhatsApp accept a color prop (default: currentColor).
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Sizes
        </h2>

        <Row label="GoogleIcon · 16 / 24 / 32">
          <GoogleIcon size={16} />
          <GoogleIcon size={24} />
          <GoogleIcon size={32} />
        </Row>

        <Row label="AppleIcon · 16 / 24 / 32">
          <AppleIcon size={16} />
          <AppleIcon size={24} />
          <AppleIcon size={32} />
        </Row>

        <Row label="InstagramIcon · 16 / 24 / 32">
          <InstagramIcon size={16} />
          <InstagramIcon size={24} />
          <InstagramIcon size={32} />
        </Row>

        <Row label="WhatsAppIcon · 16 / 24 / 32">
          <WhatsAppIcon size={16} />
          <WhatsAppIcon size={24} />
          <WhatsAppIcon size={32} />
        </Row>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 24,
            paddingBottom: 8,
            borderBottom: '1.5px solid #0F1419',
          }}
        >
          Color prop
        </h2>

        <Row label="AppleIcon · default / ink / green / coral">
          <AppleIcon size={24} />
          <AppleIcon size={24} color="#0F1419" />
          <AppleIcon size={24} color="#00B86B" />
          <AppleIcon size={24} color="#FF5A36" />
        </Row>

        <Row label="InstagramIcon · default / ink / green / coral">
          <InstagramIcon size={24} />
          <InstagramIcon size={24} color="#0F1419" />
          <InstagramIcon size={24} color="#00B86B" />
          <InstagramIcon size={24} color="#FF5A36" />
        </Row>

        <Row label="WhatsAppIcon · default / ink / green / brand">
          <WhatsAppIcon size={24} />
          <WhatsAppIcon size={24} color="#0F1419" />
          <WhatsAppIcon size={24} color="#00B86B" />
          <WhatsAppIcon size={24} color="#25D366" />
        </Row>
      </section>
    </div>
  );
}
